import { join } from 'path'
export const LABEL = 'DEVELOPMENT'
export const BACKUP_DIRECTORY = join(process.cwd(), 'backups', LABEL)
export const USE_DOCKER = true
