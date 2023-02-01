import type { API, FileInfo, Identifier } from 'jscodeshift'

const jestGlobalApis = ['afterAll', 'afterEach', 'beforeAll', 'beforeEach', 'describe', 'test', 'it', 'expect']

const testApiProps = ['concurrent', 'each', 'only', 'skip', 'todo']
const jestGlobalApiProps = {
  it: testApiProps,
  test: testApiProps,
}

const transformer = async (file: FileInfo, api: API) => {
  const j = api.jscodeshift
  const source = j(file.source)

  const vitestApis = []

  for (const jestGlobalApi of jestGlobalApis) {
    const calls = source.find(j.CallExpression, { callee: { name: jestGlobalApi } })

    if (calls.length > 0) {
      vitestApis.push(jestGlobalApi)
    }
    else if (Object.keys(jestGlobalApiProps).includes(jestGlobalApi)) {
      const propNamesList = source.find(j.MemberExpression, {
        object: { name: jestGlobalApi },
        property: { type: 'Identifier' },
      }).nodes().map(node => (node.property as Identifier).name)

      const propNames = [...new Set(propNamesList)]
      for (const propName of propNames) {
        if (jestGlobalApiProps[jestGlobalApi].includes(propName)) {
          vitestApis.push(jestGlobalApi)
          break
        }
      }
    }
  }

  if (vitestApis.length) {
    vitestApis.sort()
    const importSpecifiers = vitestApis.map(apiName => j.importSpecifier(j.identifier(apiName)))
    const importDeclaration = j.importDeclaration(importSpecifiers, j.stringLiteral('vitest'))
    source.get('program', 'body').unshift(importDeclaration)
  }

  source.find(j.ImportDeclaration, { source: { value: '@jest/globals' } }).remove()

  return source.toSource()
}

export default transformer
