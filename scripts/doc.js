import babylon from 'jscodeshift/parser/babylon';
import _ from 'lodash';

const capitalize = (s) => s[0].toUpperCase() + s.slice(1);
const print = (line = '') => console.log(line);

const EMPTY_DOC_COMMENT = {
  DOC: [],
  TYPE: [],
  USE: [],
  TEST: []
};
const DOC_COMMENT_KEYS = Object.keys(EMPTY_DOC_COMMENT);

const getModuleName = (path) => {
  const [last, penultimate] = path.replace('.js', '').split('/').reverse();
  return capitalize(last === 'index' ? penultimate : last);
};

const getComment = (r) =>
  (r.node.leadingComments || r.node.comments || [])[0]?.value;
const isTypeComment = (r) => r.trim().startsWith('::');
const getTypeGenerator = (c) => {
  try {
    return JSON.parse(c);
  } catch (e) {
    return false;
  }
};

const lower = (n) => String.fromCharCode(n + 97);
const upper = (n) => String.fromCharCode(n + 65);

const toFnString = (args) =>
  `Fn${args}<${_.range(args).map(upper).join(', ')}, Out>`;

const createArgs = (fns, args) =>
  `(${_.range(fns)
    .map((i) => `${lower(i)}?: ${toFnString(args)}`)
    .join(', ')})`;

const createTypeConstraint = (n) =>
  `<${_.range(n).map(upper).join(', ')}, Out>`;

const compilers = {
  Variadic: ({ maxFns, maxArgs }) =>
    _.range(1, maxArgs).map(
      (args) =>
        `${createTypeConstraint(args)}${createArgs(maxFns, args)}: ${toFnString(
          args
        )}`
    )
};

const compileType = (c) => (c ? compilers[c.type](c.args) : []);

const parseType = (type) => type.replace('::', '').trim();

const hasDocComment = (r) => isDocComment(getComment(r));

const getDocComment = (comment = '') => ({
  ...EMPTY_DOC_COMMENT,
  ..._.groupBy(
    comment.split('\n'),
    (() => {
      let lastMatch;
      return (line) =>
        DOC_COMMENT_KEYS.includes(line) ? void (lastMatch = line) : lastMatch;
    })()
  )
});

const collapsible = (title, content, language) =>
  content.length > 0
    ? [
        `<details><summary><em>${title}</em></summary>`,
        '<p>',
        '',
        `\`\`\`${language}`,
        ...content,
        '```',
        '',
        '</p>',
        '</details>'
      ]
    : [];

const isDocComment = (comment) =>
  Object.keys(getDocComment(comment)).some((key) =>
    DOC_COMMENT_KEYS.includes(key)
  );
const generateFunctionSignature = (name) => (type) =>
  `export function ${name}${type}`;

const isInterface = ([type = '']) => type.trim().startsWith('export interface');

const generateInterface = (name, types) => {
  const iname = types[0].match(/export interface (.*) {/)[1];
  return types.concat(`export const ${name}: ${iname}`);
};

const generateOverloads = (name, types) =>
  types
    .filter(isTypeComment)
    .map(parseType)
    .concat(...compileType(getTypeGenerator(types.join(''))))
    .map(generateFunctionSignature(name))
    .concat(['']);

const generate = {
  TYPE: (doc, name) =>
    isInterface(doc.TYPE)
      ? generateInterface(name, doc.TYPE)
      : generateOverloads(name, doc.TYPE),

  USE: (doc) => doc.USE.concat(['']),

  TEST: (doc, name) =>
    [`describe('${capitalize(name)}', () => {`]
      .concat(doc.TEST || [])
      .concat(['})', '', '']),

  DOC: (doc, name) =>
    doc.DOC.length > 0
      ? [
          `### <a href='${name}'>${name}</a>`,
          '```typescript',
          ..._.initial(generate.TYPE(doc, name)),
          '```',
          '',
          ...doc.DOC,
          '',
          ...collapsible('TypeScript Usage', doc.USE, 'typescript'),
          '',
          ...collapsible('Tests', doc.TEST, 'javascript'),
          ''
        ]
      : []
};
const moduleNameLink = (header) => {
  const name = header.replace('MODULE:', '').trim();
  const url = name.toLowerCase().replace(' ', '-');
  return `## <a href=${url}>${name}</a>`;
};

const setup = {
  DOC: ({ source }) => {
    const parsed = babylon().parse(source);
    const header = parsed.comments[0]?.value.trim();
    if (header && header.startsWith('MODULE')) {
      const [first, ...rest] = header.split('\n');
      return [moduleNameLink(first), ...rest];
    }
    return [];
  },
  TEST: ({ path }) => [`describe('${getModuleName(path)}', () => {`, '']
};

const teardown = {
  TEST: () => [`})`, '']
};

export default function transformer(
  { path, source },
  { jscodeshift: j },
  { pass }
) {
  setup[pass]?.({ path, source, j }).forEach(print);
  print();
  j(source)
    .find(j.ExportNamedDeclaration)
    .filter(hasDocComment)
    .forEach((r) => {
      const name = r.value?.declaration?.declarations[0]?.id?.name;
      const doc = getDocComment(getComment(r));
      generate[pass]?.(doc, name).forEach(print);
    });
  print();

  teardown[pass]?.().forEach(print);
}
