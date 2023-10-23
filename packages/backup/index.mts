#!/usr/bin/env -S npx tsx

import { $ } from 'zx'
import * as z from 'zod'
import * as mongodb from './databases/mongodb.ts'
import * as elasticsearch from './databases/elasticsearch.ts'
import { BACKUP_DIRECTORY } from './config.ts'
import configurationJSON from './configuration.json'

await $`mkdir -p ${BACKUP_DIRECTORY}`

const OptionsSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('mongodb'),
    options: mongodb.OptionsSchema
  }),
  z.object({
    type: z.literal('elasticsearch'),
    options: elasticsearch.OptionsSchema
  })
])

const ConfigurationSchema = z.object({
  databases: z.array(OptionsSchema)
})

const configuration = ConfigurationSchema.parse(configurationJSON)

async function snapshot() {
  for (const database of configuration.databases) {
    switch (database.type) {
      case 'mongodb':
        await mongodb.snapshot(database.options)
        break
      case 'elasticsearch':
        await elasticsearch.snapshot(database.options)
        break
      default:
        throw new Error(`Unknown database type`)
    }
  }
}

async function restore() {
  for (const database of configuration.databases) {
    switch (database.type) {
      case 'mongodb':
        await mongodb.restore(database.options)
        break
      default:
        throw new Error(`Unknown database type: ${database.type}`)
    }
  }
}

if (process.env[2] === 'restore') {
  await restore()
} else {
  await snapshot()
}
