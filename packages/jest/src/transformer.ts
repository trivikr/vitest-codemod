import type { API, FileInfo } from 'jscodeshift'
import {
  addFactoryFunctionToMock,
  addImportOriginalToMocks,
  convertMockImplementationToFunction,
  convertRequireToImport,
  deduplicateViMocks,
  getApisFromCallExpression,
  getApisFromMemberExpression,
  hoistMockVariables,
  replaceJestObjectWithVi,
  replaceJestTypes,
  replaceTestApiFailing,
  replaceTestApiFit,
  updateDefaultExportMocks,
} from './apis'
import { prependImport } from './modules'
import { getSnapshotWithoutPrototype } from './snapshots'

const transformer = async (file: FileInfo, api: API) => {
  if (file.path.endsWith('.snap'))
    return getSnapshotWithoutPrototype(file.source)

  const j = api.jscodeshift
  const source = j(file.source)

  // Get APIs and types to import from vitest
  const apisFromCallExpression = getApisFromCallExpression(j, source)
  const apisFromMemberExpression = getApisFromMemberExpression(j, source)
  const typesToImport = replaceJestTypes(j, source)
  const vitestApis = [...new Set([...apisFromCallExpression, ...apisFromMemberExpression, ...typesToImport])]

  if (vitestApis.length) {
    vitestApis.sort()
    const importSpecifiers = vitestApis.map(apiName => j.importSpecifier(j.identifier(apiName)))
    const importDeclaration = j.importDeclaration(importSpecifiers, j.stringLiteral('vitest'))
    prependImport(j, source, importDeclaration)
  }

  replaceTestApiFit(j, source)
  replaceTestApiFailing(j, source)

  addFactoryFunctionToMock(j, source)
  updateDefaultExportMocks(j, source, file.path)
  convertMockImplementationToFunction(j, source)
  replaceJestObjectWithVi(j, source)

  // Hoist mock variables to avoid "cannot access before initialization" errors
  // This must run AFTER replaceJestObjectWithVi so we can find vi.mock calls
  hoistMockVariables(j, source)

  // Remove duplicate mock calls (keep factory mocks, remove empty mocks for same module)
  deduplicateViMocks(j, source)

  // Add importOriginal to partial mocks to preserve all exports
  addImportOriginalToMocks(j, source)

  // Convert require() calls to dynamic import() for mocked modules
  convertRequireToImport(j, source)

  source.find(j.ImportDeclaration, { source: { value: '@jest/globals' } }).remove()

  return source.toSource()
}

export default transformer
