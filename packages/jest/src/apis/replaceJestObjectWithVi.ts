import type { Collection, JSCodeshift } from 'jscodeshift'

const apiNamesRecord: Record<string, string> = {
  createMockFromModule: 'importMock',
  requireActual: 'importActual',
  requireMock: 'importMock',
}
const apiNamesToMakeAsync = ['createMockFromModule', 'requireActual', 'requireMock']

export const replaceJestObjectWithVi = (j: JSCodeshift, source: Collection<any>): void => {
  // Replace `jest` with `vi`
  source.find(j.MemberExpression, {
    object: { type: 'Identifier', name: 'jest' },
  }).forEach((path) => {
    if (path.node.property.type === 'Identifier') {
      const propertyName = path.node.property.name

      if (propertyName === 'enableAutomock') {
        throw new Error(
          `The automocking API "${propertyName}" is not supported in vitest.\n`
          + 'You can explicitly mock using jest.mock in the test file, or '
          + `skip transformation on the files which use "${propertyName}".\n`
          + 'See https://vitest.dev/guide/migration.html',
        )
      }

      if (propertyName === 'disableAutomock') {
        j(path.parentPath).remove()
        return
      }

      if (apiNamesRecord[propertyName])
        path.node.property.name = apiNamesRecord[propertyName]

      if (apiNamesToMakeAsync.includes(propertyName)) {
        // Add await to the call expression
        j(path.parentPath).replaceWith(path =>
          j.awaitExpression(path.value),
        )

        // Add async to the function
        let parentPath = path.parentPath
        while (!['FunctionExpression', 'ArrowFunctionExpression'].includes(parentPath.value.type))
          parentPath = parentPath.parentPath
        parentPath.value.async = true
      }
    }

    path.node.object = j.identifier('vi')
    return path
  })
}
