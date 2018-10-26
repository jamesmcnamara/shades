export const parser = 'babylon';

export default function transformer(file, api) {
  const j = api.jscodeshift;

  const castToIdentifier = pattern => ({
    ...pattern,
    type: j.Identifier.name,
    name:
      pattern.name ||
      pattern?.typeAnnotation?.id?.name?.[0].toLowerCase() ||
      'arg'
  });

  const paramTypesToString = params =>
    `(${params
      .map(castToIdentifier)
      .map(r => j(r).toSource())
      .join(', ')})`;

  function extractArrowFunctionType(node, type = '') {
    const typeBuilder =
      type +
      j(node.typeParameters || '').toSource() +
      paramTypesToString(node.params) +
      ' => ';

    if (j.ArrowFunctionExpression.check(node.body)) {
      return extractArrowFunctionType(node.body, type + typeBuilder);
    } else {
      return (
        typeBuilder +
        j(node.returnType)
          .toSource()
          .replace(/^: /, '')
      );
    }
  }

  const idHasTypeAnnotation = r => r.node.id.typeAnnotation;

  const getRootFxn = r => r.get('init');

  const arrowFunctionHasTypeAnnotation = r =>
    r.node.params.every(s => s.typeAnnotation);

  const getComments = r => r.node.leadingComments || r.node.comments;
  const isTypeComment = r => r.value.trim().startsWith('::');
  const hasTypeComment = r => getComments(r)?.some(isTypeComment);
  const getTypesFromComment = r =>
    getComments(r)
      .filter(isTypeComment)
      .map(r => r.value.replace('::', '').trim());

  const generators = {
    functor(ctx) {
      const functorTypes = ['G[]', '{[s: string]: G}', '{[s: number]: G}'];
      return functorTypes
        .map(type =>
          ctx.signature.replace(/Functor<(.)>/g, (match, generic) =>
            type.replace('G', generic)
          )
        )
        .map(sig => `function ${ctx.name}${sig}`)
        .join('\n');
    },

    multiArity(ctx) {}
  };

  console.log();
  j(file.source)
    .find(j.ExportNamedDeclaration)
    .filter(hasTypeComment)
    .forEach(r => {
      const name = r.value?.declaration?.declarations[0]?.id?.name;
      const types = getTypesFromComment(r);
      types.forEach(type => console.log(`export function ${name}${type}`));
      console.log();
    });
  console.log();
}
