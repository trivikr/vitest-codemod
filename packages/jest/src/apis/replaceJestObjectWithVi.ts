import type { Collection, JSCodeshift } from 'jscodeshift'

export const replaceJestObjectWithVi = (j: JSCodeshift, source: Collection<any>): void => {
  // Replace `jest` with `vi`
  source.find(j.MemberExpression, {
    object: { type: 'Identifier', name: 'jest' },
  }).forEach((path) => {
    path.node.object = j.identifier('vi')
    return path
  })
}
