---
"@vitest-codemod/jest": minor
"vitest-codemod": minor
---

Improve transformations and update dependencies

- Scope mockImplementation→function conversion to vi.mocked() calls only
- Simplify requireMock handling to use vi.importMock directly
- Simplify default export detection using runtime require() inspection
- Remove hoistMockVariables and addImportOriginalToMocks transformations
- Update dependencies: jscodeshift 0.16, jest 29.7, vitest 0.34, eslint 8.57
- Add test fixtures for deduplicate-mocks and require-to-import
- Document all transformations and limitations in README
