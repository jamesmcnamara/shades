import _ from 'lodash';

export const parser = "babylon";

const capitalize = s => s[0].toUpperCase() + s.slice(1);
const print = (line = "") => console.log(line);

const EMPTY_DOC_COMMENT = {
  DOC: [],
  TYPE: [],
  USE: [],
  TEST: []
};
const DOC_COMMENT_KEYS = Object.keys(EMPTY_DOC_COMMENT);

const getModuleName = path => {
  const [last, penultimate] = path
    .replace(".js", "")
    .split("/")
    .reverse();
  return capitalize(last === "index" ? penultimate : last);
};

const getComment = r =>
  (r.node.leadingComments || r.node.comments || [])[0]?.value;
const isTypeComment = r => r.trim().startsWith("::");
const getTypeGenerator = c => {
  try {
    return JSON.parse(c);
  } catch (e) {
    return false;
  }
};

const lower = n => String.fromCharCode(n + 97);
const upper = n => String.fromCharCode(n + 65);

const toFnString = args =>
  `Fn${args}<${_.range(args)
    .map(upper)
    .join(", ")}, Out>`;

const createArgs = (fns, args) =>
  `(${_.range(fns)
    .map(i => `${lower(i)}: ${toFnString(args)}`)
    .join(", ")})`;

const createTypeConstraint = n =>
  `<${_.range(n)
    .map(upper)
    .join(", ")}, Out>`;

const compilers = {
  Variadic: ({ maxFns, maxArgs }) =>
    _(_.range(1, maxFns))
      .flatMap(fns =>
        _(_.range(1, maxArgs))
          .map(
            args =>
              `${createTypeConstraint(args)}${createArgs(
                fns,
                args
              )}: ${toFnString(args)}`
          )
          .value()
      )
      .value()
};

const compileType = c => (c ? compilers[c.type](c.args) : []);

const parseType = type => type.replace("::", "").trim();

const hasDocComment = r => isDocComment(getComment(r));

const getDocComment = (comment = "") => ({
  ...EMPTY_DOC_COMMENT,
  ..._.groupBy(
    comment.split("\n"),
    (() => {
      let lastMatch;
      return line =>
        DOC_COMMENT_KEYS.includes(line) ? void (lastMatch = line) : lastMatch;
    })()
  )
});

const isDocComment = comment =>
  Object.keys(getDocComment(comment)).some(key =>
    DOC_COMMENT_KEYS.includes(key)
  );

const generate = {
  TYPE: (doc, name) =>
    doc.TYPE.filter(isTypeComment)
      .map(parseType)
      .concat(...compileType(getTypeGenerator(doc.TYPE.join(""))))
      .map(type => `export function ${name}${type};`)
      .concat([""]),

  USE: doc => doc.USE.concat([""]),

  TEST: (doc, name) =>
    [`describe('${capitalize(name)}', () => {`]
      .concat(doc.TEST || [])
      .concat(["})", "", ""]),

  DOC: (doc, name) => [
    `#### <a href='${name}'>${name}</a>`,
    "```typescript",
    ..._.initial(generate.TYPE(doc, name)),
    "```",
    "",
    ...doc.DOC,
    "",
    ""
  ]
};

const setup = {
  TEST: path => [`describe('${getModuleName(path)}', () => {`, ""]
};

const teardown = {
  TEST: () => [`})`, ""]
};

export default function transformer(
  { path, source },
  { jscodeshift: j },
  { pass }
) {
  setup[pass]?.(path).forEach(print);

  print();
  j(source)
    .find(j.ExportNamedDeclaration)
    .filter(hasDocComment)
    .forEach(r => {
      const name = r.value?.declaration?.declarations[0]?.id?.name;
      const doc = getDocComment(getComment(r));
      generate[pass]?.(doc, name).forEach(print);
    });
  print();

  teardown[pass]?.().forEach(print);
}
