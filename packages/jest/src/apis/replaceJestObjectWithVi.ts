import type { Collection, JSCodeshift } from 'jscodeshift'

const unavailableAutomockApis = ['disableAutomock', 'enableAutomock']
const apiNamesRecord: Record<string, string> = {
  createMockFromModule: 'importMock',
}

export const replaceJestObjectWithVi = (j: JSCodeshift, source: Collection<any>): void => {
  // Replace `jest` with `vi`
  source.find(j.MemberExpression, {
    object: { type: 'Identifier', name: 'jest' },
  }).forEach((path) => {
    if (path.node.property.type === 'Identifier') {
      const propertyName = path.node.property.name

      if (unavailableAutomockApis.includes(propertyName)) {
        throw new Error(
          `The automocking API "${propertyName}" is not supported in vitest.\n\n`
          + 'Please switch to explicit mocking in Jest before running transformation, or '
          + 'skip transformation on the files which uses this API.',
        )
      }

      if (apiNamesRecord[propertyName])
        path.node.property.name = apiNamesRecord[propertyName]
    }

    path.node.object = j.identifier('vi')
    return path
  })
}
