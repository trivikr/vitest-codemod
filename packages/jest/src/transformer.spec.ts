import { readdirSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import jscodeshift from 'jscodeshift'
import { describe, expect, it } from 'vitest'

import transform from './transformer'

describe('transformer', () => {
  const inputFileRegex = /(.*).input.m?[jt]sx?$/
  const errorFileRegex = /(.*).error.m?[jt]sx?$/

  const fixtureDir = join(__dirname, '__fixtures__')
  const fixtureSubDirs = readdirSync(fixtureDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  const getTestFileMetadata = (dirPath: string, fileRegex: RegExp) =>
    readdirSync(dirPath)
      .filter(fileName => fileRegex.test(fileName))
      .map(
        fileName =>
          [
            (fileName.match(fileRegex) as RegExpMatchArray)[1],
            fileName.split('.').pop() as string,
          ] as const,
      )

  const getTestFileInput = async (dirPath: string, fileName: string) => {
    const inputPath = join(dirPath, fileName)
    const inputCode = await readFile(inputPath, 'utf8')
    return { path: inputPath, source: inputCode }
  }

  const getTestFileOutputCode = async (dirPath: string, fileName: string) =>
    readFile(join(dirPath, fileName), 'utf8')

  describe.each(fixtureSubDirs)('%s', (subDir) => {
    const subDirPath = join(fixtureDir, subDir)

    it.concurrent.each(getTestFileMetadata(subDirPath, inputFileRegex))(
      'transforms: %s.%s',
      async (filePrefix, fileExtension) => {
        const inputFileName = [filePrefix, 'input', fileExtension].join('.')
        const outputFileName = [filePrefix, 'output', fileExtension].join('.')

        const input = await getTestFileInput(subDirPath, inputFileName)
        const outputCode = await getTestFileOutputCode(subDirPath, outputFileName)

        const output = await transform(input, {
          j: jscodeshift,
          jscodeshift,
          stats: () => {},
          report: () => {},
        })

        expect(output.trim()).toEqual(outputCode.trim())
      },
      60000,
    )

    it.concurrent.each(getTestFileMetadata(subDirPath, errorFileRegex))(
      'throws: %s.%s',
      async (filePrefix, fileExtension) => {
        const inputFileName = [filePrefix, 'error', fileExtension].join('.')
        const input = await getTestFileInput(subDirPath, inputFileName)

        await expect(
          transform(input, {
            j: jscodeshift,
            jscodeshift,
            stats: () => {},
            report: () => {},
          }),
        ).rejects.toThrowError()
      },
    )
  })

  describe('.snap', () => {
    it.each([
      [
        'Empty array',
        'exports[`snapshot 1`] = `Array []`;',
        'exports[`snapshot 1`] = `[]`;',
      ],
      [
        'Empty object',
        'exports[`snapshot 1`] = `Object {}`;',
        'exports[`snapshot 1`] = `{}`;',
      ],
      [
        'Nested array+object',
        `exports[\`snapshot 1\`] = \`
          Array [
            Object {
              "foo": "bar",
            },
          ]
          \`;`,
        `exports[\`snapshot 1\`] = \`
          [
            {
              "foo": "bar",
            },
          ]
          \`;`,
      ],
    ])('%s', async (testName, inputCode, outputCode) => {
      const input = {
        path: 'test.js.snap',
        source: inputCode,
      }

      const output = await transform(input, {
        j: jscodeshift,
        jscodeshift,
        stats: () => {},
        report: () => {},
      })

      expect(output.trim()).toEqual(outputCode)
    })
  })
})
