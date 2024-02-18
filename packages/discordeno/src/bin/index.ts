import { Command } from 'commander'
import { createWriteStream } from 'fs'
import transformers, { type TransformerObjectProprieties, type TransformerUnionTypes } from './transformers.js'

const program = new Command()

program.name('discordeno').description('CLI to discordeno utilities').version('0.1.0')

program
  .command('generate')
  .description('Generate types/schema for discordeno')
  .action(async () => {
    const file = createWriteStream('transformers.generated.ts', { encoding: 'utf-8' })

    file.write('/* eslint-disable */\n')
    file.write('/* prettier-ignore */\n')
    file.write('// <auto-generated/>\n\n')

    for (const structure of Object.values(transformers)) {
      file.write(`export interface ${structure.name} ${parseProprietyType(structure.proprieties)}\n\n`)
    }

    file.close()
  })

program.parse()

function parseProprietyType(prop: TransformerObjectProprieties['type'] | TransformerUnionTypes, intent: number = 2, isUnion = false): string {
  if (typeof prop === 'string') return prop

  const spaces = ' '.repeat(intent)

  if (Array.isArray(prop)) {
    return prop.map((x) => parseProprietyType(x, intent, true)).join(' | ')
  }

  if (isUnion) {
    const unionObject = prop as TransformerUnionTypes

    return unionObject.array ? `Array<${parseProprietyType(unionObject.type, intent + 2)}>` : parseProprietyType(unionObject.type, intent + 2)
  }

  const proprieties = prop as Record<string, TransformerObjectProprieties>

  let result = '{\n'

  for (const [propName, prop] of Object.entries(proprieties)) {
    if (prop.comment) {
      const commentLines = prop.comment.reduce((prev, cur) => `${prev}${spaces} * ${cur}\n`, '')

      result += `${spaces}/**\n${commentLines}${spaces} */\n`
    }

    const type = prop.array ? `Array<${parseProprietyType(prop.type, intent + 2)}>` : parseProprietyType(prop.type, intent + 2)

    result += `${spaces}${propName}${prop.optional ? '?' : ''}: ${type}\n`
  }

  result += `${' '.repeat(intent - 2)}}`

  return result
}
