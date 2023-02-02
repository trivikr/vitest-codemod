import type { Collection, Identifier, JSCodeshift } from 'jscodeshift'

export const replaceTestApiFailing = (j: JSCodeshift, source: Collection<any>): void => {
  for (const testApiName of ['it', 'test']) {
    source.find(j.MemberExpression, {
      object: { type: 'Identifier', name: testApiName },
      property: { type: 'Identifier', name: 'failing' },
    }).forEach((path) => {
      (path.node.property as Identifier).name = 'fails'
      return path
    })
  }
}
