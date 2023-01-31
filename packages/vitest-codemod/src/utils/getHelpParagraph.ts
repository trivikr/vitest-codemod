import type { VitestCodemodTransform } from '@vitest-codemod/types'
import { getTransformDescription } from './getTransformDescription'

const separator = '-'.repeat(95)

export const getHelpParagraph = (transforms: VitestCodemodTransform[]) =>
  `${separator}
vitest-codemod is a lightweight wrapper over jscodeshift.
It processes --help, --version and --transform options before passing them downstream.

You can provide names of the custom transforms instead of a local path or url:

${transforms.map(transform => getTransformDescription(transform).join('\n'))}

Example: vitest-codemod -t jest example.spec.js

To use the latest version of vitest-codemod, please clear your npx cache and re-run.

${separator}\n\n`
