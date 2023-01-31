import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/src/__fixtures__/*.output.{js,ts}', '**/*.spec.ts'],
  },
})
