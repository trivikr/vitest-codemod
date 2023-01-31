import type { API, FileInfo } from 'jscodeshift'

const transformer = async (file: FileInfo, api: API) => {
  const j = api.jscodeshift
  const source = j(file.source)

  const apis = []

  for (const name of ['afterAll', 'afterEach', 'beforeAll', 'beforeEach', 'describe', 'test', 'it', 'expect']) {
    const calls = source.find(j.CallExpression, { callee: { name } })

    if (calls.length > 0)
      apis.push(name)
  }

  if (apis.length) {
    apis.sort()
    const importSpecifiers = apis.map(apiName => j.importSpecifier(j.identifier(apiName)))
    const importDeclaration = j.importDeclaration(importSpecifiers, j.stringLiteral('vitest'))
    source.get('program', 'body').unshift(importDeclaration)
  }

  return source.toSource()
}

export default transformer
