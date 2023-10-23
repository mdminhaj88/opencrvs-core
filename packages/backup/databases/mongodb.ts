import { $ } from 'zx'
import { join } from 'path'
// eslint-disable-next-line import/no-relative-parent-imports
import { BACKUP_DIRECTORY, USE_DOCKER } from '../config.ts'
// eslint-disable-next-line import/no-relative-parent-imports
import { getNetwork } from '../docker.ts'

import * as z from 'zod'

export const OptionsSchema = z.object({
  host: z.string(),
  databaseName: z.string(),
  username: z.string().optional(),
  password: z.string().optional(),
  authenticationDatabase: z.string().optional()
})

type MongoDBConfiguration = z.infer<typeof OptionsSchema>

const MONGODUMP_EXECUTABLE = (
  command: 'mongodump' | 'mongorestore',
  commandLineOptions: string[]
) => {
  return USE_DOCKER
    ? $`docker ${[
        `run`,
        `--rm`,
        `-v`,
        `${BACKUP_DIRECTORY}:/data/backups/mongo`,
        `--network=${getNetwork()}`,
        `mongo:4.4`,
        `bash`,
        '-c',
        [command as string].concat(commandLineOptions).join(' ')
      ]}`
    : $`mongodump ${commandLineOptions.join(' ')}`
}

function getFileName(options: MongoDBConfiguration) {
  return `mongodb-${options.databaseName}.tar.gz`
}

function getAuthenticationOptios(options: MongoDBConfiguration) {
  if (options.username && options.password) {
    return [
      `--username ${options.username}`,
      `--password ${options.password}`,
      `--authenticationDatabase ${options.authenticationDatabase || 'admin'}`
    ]
  } else {
    return []
  }
}

export function snapshot(options: MongoDBConfiguration) {
  const commandLineOptions = [
    ...getAuthenticationOptios(options),
    `--host ${options.host}`,
    `-d ${options.databaseName}`,
    `--gzip`,
    `--quiet`,
    `--archive=${join('/data/backups/mongo', getFileName(options))}`
  ]

  return MONGODUMP_EXECUTABLE('mongodump', commandLineOptions)
}

export function restore(options: MongoDBConfiguration) {
  const commandLineOptions = [
    ...getAuthenticationOptios(options),
    `--host ${options.host}`,
    `--drop`,
    `--gzip`,
    `--quiet`,
    `--archive=${join('/data/backups/mongo', getFileName(options))}`
  ]

  return MONGODUMP_EXECUTABLE('mongorestore', commandLineOptions)
}
