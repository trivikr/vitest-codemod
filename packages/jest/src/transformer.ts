import type { API, Collection, FileInfo, ImportDeclaration, JSCodeshift, Node } from 'jscodeshift'
import {
  getApisFromCallExpression,
  getApisFromMemberExpression,
  replaceTestApiFailing,
  replaceTestApiFit,
} from './apis'

const prependImport = (j: JSCodeshift, source: Collection<any>, importDeclaration: ImportDeclaration) => {
  const existingImports = source.find(j.ImportDeclaration)
  if (existingImports.length > 0) {
    const firstImport = existingImports.at(0)
    const firstImportNode = firstImport.nodes()[0]
    if (firstImportNode?.comments) {
      importDeclaration.comments = firstImportNode.comments
      firstImportNode.comments = null
    }

    firstImport.insertBefore(importDeclaration)
    return
  }

  const firstNode: Node = source.find(j.Program).get('body', 0).node
  const { comments } = firstNode
  if (comments?.length) {
    const comment = comments[0]

    // Only move comments that look like file-level comments. Ignore
    // line-level and JSDoc-style comments because these probably belong
    // to the first node, rather than the file.
    if ((comment.type === 'Block' || comment.type === 'CommentBlock') && !comment.value.startsWith('*')) {
      importDeclaration.comments = comments
      firstNode.comments = null
    }
  }

  source.get('program', 'body').unshift(importDeclaration)
}

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
    prependImport(j, source, importDeclaration)
  }

  replaceTestApiFit(j, source)
  replaceTestApiFailing(j, source)

  source.find(j.ImportDeclaration, { source: { value: '@jest/globals' } }).remove()

  return source.toSource()
}

export default transformer
