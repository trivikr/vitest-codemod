import type { Collection, JSCodeshift } from 'jscodeshift'

export function replaceTestApiFit(j: JSCodeshift, source: Collection<any>): void {
  const jestApiName = 'fit'
  const vitestApiObject = j.memberExpression(j.identifier('it'), j.identifier('only'))

  // Replace `fit` with `it.only`
  source.find(j.CallExpression, {
    callee: { type: 'Identifier', name: jestApiName },
  }).forEach((path) => {
    path.node.callee = vitestApiObject
    return path
  })

  // Replace `fit.(each|failing)` with `it.only.(each|failing)`
  for (const fitModifierName of ['each', 'failing']) {
    source.find(j.MemberExpression, {
      object: { type: 'Identifier', name: jestApiName },
      property: { type: 'Identifier', name: fitModifierName },
    }).forEach((path) => {
      path.node.object = vitestApiObject
      return path
    })
  }
}
