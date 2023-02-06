import type { Collection, ImportDeclaration, JSCodeshift, Node } from 'jscodeshift'

export const prependImport = (j: JSCodeshift, source: Collection<any>, importDeclaration: ImportDeclaration) => {
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
