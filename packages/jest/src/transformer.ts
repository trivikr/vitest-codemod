import type { API, FileInfo } from 'jscodeshift'
import addImports from 'jscodeshift-add-imports'

const transformer = async (file: FileInfo, api: API) => {
  const j = api.jscodeshift
  const source = j(file.source)

  const apis = []

  for (const name of ['afterAll', 'afterEach', 'beforeAll', 'beforeEach', 'describe', 'test', 'it', 'expect']) {
    const calls = source.find(j.CallExpression, { callee: { name } })

    if (calls.length > 0)
      apis.push(j.importSpecifier(j.identifier(name), j.identifier(name)))
  }

  if (apis.length) {
    apis.sort()
    addImports(source, j.importDeclaration(apis, j.stringLiteral('vitest')))
  }

  return source.toSource()
}

export default transformer
