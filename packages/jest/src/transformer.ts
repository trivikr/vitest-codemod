import type { API, FileInfo } from 'jscodeshift'
import {
  getApisFromCallExpression,
  getApisFromMemberExpression,
  replaceJestObjectWithVi,
  replaceTestApiFailing,
  replaceTestApiFit,
} from './apis'

const transformer = async (file: FileInfo, api: API) => {
  const j = api.jscodeshift
  const source = j(file.source)

  const apisFromCallExpression = getApisFromCallExpression(j, source)
  const apisFromMemberExpression = getApisFromMemberExpression(j, source)
  const vitestApis = [...new Set([...apisFromCallExpression, ...apisFromMemberExpression])]

  if (vitestApis.length) {
    vitestApis.sort()
    const importSpecifiers = vitestApis.map(apiName => j.importSpecifier(j.identifier(apiName)))
    const importDeclaration = j.importDeclaration(importSpecifiers, j.stringLiteral('vitest'))
    source.get('program', 'body').unshift(importDeclaration)
  }

  replaceTestApiFit(j, source)
  replaceTestApiFailing(j, source)
  replaceJestObjectWithVi(j, source)

  source.find(j.ImportDeclaration, { source: { value: '@jest/globals' } }).remove()

  return source.toSource()
}

export default transformer
