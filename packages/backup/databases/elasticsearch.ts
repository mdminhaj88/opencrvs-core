import { Client } from '@elastic/elasticsearch'
import { $, chalk } from 'zx'
import { join } from 'path'
import * as z from 'zod'
// eslint-disable-next-line import/no-relative-parent-imports
import { BACKUP_DIRECTORY } from '../config.ts'

export const OptionsSchema = z.object({
  host: z.string(),
  index: z.string(),
  backupDirectoryInsideContainer: z.string(),
  backupDirectoryOnHost: z.string(),
  username: z.string().optional(),
  password: z.string().optional()
})

type ElasticConfiguration = z.infer<typeof OptionsSchema>

const BACKUP_REPOSITORY = 'ocrvs' //&'OPENCRSV_BACKUPS'

function getHostString(options: ElasticConfiguration): string {
  if (options.username || options.password) {
    return `${options.username}:${options.password}@${options.host}`
  } else {
    return options.host
  }
}

const ErrorSchema = z.object({
  meta: z.object({
    body: z.object({
      error: z.object({
        type: z.string()
      })
    })
  })
})

async function createSnapshot(client: Client, options: ElasticConfiguration) {
  const response = await client.snapshot.create({
    repository: BACKUP_REPOSITORY,
    snapshot: `snapshot_` + Date.now(),
    wait_for_completion: true,
    body: {
      indices: options.index
    }
  })
  const elasticError = ErrorSchema.safeParse(response)
  if (elasticError.success) {
    throw response
  }
  return response
}

function getElasticErrorType(error: unknown) {
  const elasticError = ErrorSchema.safeParse(error)
  if (elasticError.success) {
    return elasticError.data.meta.body.error.type
  }
  return undefined
}

const SnapshotsResponseSchema = z.object({
  body: z.object({
    snapshots: z.array(
      z.object({
        snapshot: z.string(),
        uuid: z.string(),
        version_id: z.number(),
        version: z.string(),
        indices: z.array(z.string()),
        include_global_state: z.boolean(),
        state: z.string(),
        start_time: z.string(),
        start_time_in_millis: z.number(),
        end_time: z.string(),
        end_time_in_millis: z.number(),
        duration_in_millis: z.number(),
        failures: z.array(z.unknown())
      })
    )
  })
})

async function deleteAllSnapshots(client: Client, repository: string) {
  const response = await client.snapshot.get({
    repository: repository,
    snapshot: '_all'
  })

  const snapshotsResponse = SnapshotsResponseSchema.parse(response)

  const snapshots = snapshotsResponse.body.snapshots.map(
    (snapshotInfo) => snapshotInfo.snapshot
  )

  for (const snapshot of snapshots) {
    await client.snapshot.delete({
      repository: repository,
      snapshot: snapshot
    })
  }
}

async function cleanup(client: Client, options: ElasticConfiguration) {
  await deleteAllSnapshots(client, BACKUP_REPOSITORY)
  try {
    await client.snapshot.deleteRepository({
      repository: BACKUP_REPOSITORY
    })
  } catch (error) {
    if (getElasticErrorType(error) === 'repository_missing_exception') {
      return
    }
    throw error
  }
}

export async function snapshot(options: ElasticConfiguration) {
  const client = new Client({
    node: `http://${getHostString(options)}`
  })

  await client.snapshot.createRepository({
    repository: BACKUP_REPOSITORY,
    body: {
      type: 'fs',
      settings: {
        location: options.backupDirectoryInsideContainer,
        compress: true
      }
    }
  })

  try {
    await createSnapshot(client, options)
    await $`pwd`
    await $`tar -zcf ${join(
      BACKUP_DIRECTORY,
      `elasticsearch-${options.index}.tar.gz`
    )} ${options.backupDirectoryOnHost}`

    await cleanup(client, options)
  } catch (error) {
    const elasticError = ErrorSchema.safeParse(error)
    if (!elasticError.success) {
      throw error
    }
    if (
      elasticError.data.meta.body.error.type === 'index_not_found_exception'
    ) {
      console.warn(
        chalk.yellow(
          `Elasticsearch index "${options.index}" not found. Skipping`
        )
      )
    } else {
      throw error
    }
  }
}

export function restore() {}
