export const parser = 'flow'

const hasTypeAnnotation = (r) => r.node.params.every(s => s.typeAnnotation) && r.node.returnType


const hasComment = r => r.node.comments

const generators = {
  functor(ctx) {
    const functorTypes = ['G[]', '{[s: string]: G}', '{[s: string]: G}']
    return functorTypes
      .map(type => 
        ctx.signature.replace(/Functor<(.)>/g, (match, generic) => 
          type.replace('G', generic)))
        .map(sig => `declare function ${ctx.name}${sig}`)
        .join('\n')
  },

  multiArity(ctx) {
    
  }
}

export default function transformer(file, api) {
  const j = api.jscodeshift;

  j(file.source)
    .find(j.ExportNamedDeclaration)
    .find(j.FunctionDeclaration)
    .filter(hasTypeAnnotation)
    .forEach(r => 
      console.log(`declare function ${r.node.id.name}(${j(r.node.params).toSource()})${j(r.node.returnType).toSource()}`)
    )

  j(file.source)
    .find(j.ExportNamedDeclaration)
    .filter(hasComment)
    .forEach(r => {
      const comment = JSON.parse(r.node.comments[0].value)
      comment.name = r.node.declaration.declarations[0].id.name

      comment.types.map(type => 
        console.log(generators[type](comment))
      )
      })

}
