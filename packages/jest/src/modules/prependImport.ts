import type { Collection, ImportDeclaration, JSCodeshift, Node } from 'jscodeshift'

export const prependImport = (j: JSCodeshift, source: Collection<any>, importDeclaration: ImportDeclaration) => {
  // Check if there's already a vitest import and merge specifiers if so
  const existingVitestImport = source.find(j.ImportDeclaration, {
    source: { value: 'vitest' },
  })

  if (existingVitestImport.length > 0) {
    const existingNode = existingVitestImport.nodes()[0]
    const existingSpecifierNames = new Set(
      existingNode.specifiers
        ?.filter((s): s is typeof s & { type: 'ImportSpecifier' } => s.type === 'ImportSpecifier')
        .map(s => s.imported.type === 'Identifier' ? s.imported.name : '') || [],
    )

    // Add new specifiers that don't already exist
    const newSpecifiers = importDeclaration.specifiers?.filter((s) => {
      if (s.type !== 'ImportSpecifier')
        return false
      const name = s.imported.type === 'Identifier' ? s.imported.name : ''
      return !existingSpecifierNames.has(name)
    }) || []

    if (newSpecifiers.length > 0 && existingNode.specifiers) {
      existingNode.specifiers.push(...newSpecifiers)
      // Sort specifiers alphabetically
      existingNode.specifiers.sort((a, b) => {
        const aName = (a.type === 'ImportSpecifier' && a.imported.type === 'Identifier') ? a.imported.name : ''
        const bName = (b.type === 'ImportSpecifier' && b.imported.type === 'Identifier') ? b.imported.name : ''
        return aName.localeCompare(bName)
      })
    }
    return
  }

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
