import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/src/__fixtures__/*.output.{mjs,js,ts}', '**/*.spec.ts'],
    forceRerunTriggers: ['**/__fixtures__/**'],
  },
})
