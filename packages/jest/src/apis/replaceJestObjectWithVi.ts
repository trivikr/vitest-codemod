import type { Collection, JSCodeshift } from 'jscodeshift'

const unavailableAutomockApis = ['disableAutomock', 'enableAutomock']

export const replaceJestObjectWithVi = (j: JSCodeshift, source: Collection<any>): void => {
  // Replace `jest` with `vi`
  source.find(j.MemberExpression, {
    object: { type: 'Identifier', name: 'jest' },
  }).forEach((path) => {
    if (
      path.node.property.type === 'Identifier'
      && unavailableAutomockApis.includes(path.node.property.name)
    ) {
      throw new Error(
        `The automocking API "${path.node.property.name}" is not supported in vitest.\n\n`
        + 'Please switch to explicit mocking in Jest before running transformation, or'
        + 'skip transformation on the files which uses this API.',
      )
    }

    path.node.object = j.identifier('vi')
    return path
  })
}
