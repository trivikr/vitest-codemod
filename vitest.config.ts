import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    allowOnly: true,
    forceRerunTriggers: ['**/__fixtures__/**'],
    include: ['**/src/__fixtures__/**/*.output.{mjs,js,ts}', '**/*.spec.ts'],
  },
})
