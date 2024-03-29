/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * OpenCRVS is also distributed under the terms of the Civil Registration
 * & Healthcare Disclaimer located at http://opencrvs.org/license.
 *
 * Copyright (C) The OpenCRVS Authors located at https://github.com/opencrvs/opencrvs-core/blob/master/AUTHORS.
 */
export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/webhooks'
export const HOST = process.env.HOST || '0.0.0.0'
export const PORT = process.env.PORT || 2525
export const USER_MANAGEMENT_URL =
  process.env.USER_MANAGEMENT_URL || 'http://localhost:3030/'
export const CERT_PRIVATE_KEY_PATH =
  (process.env.CERT_PRIVATE_KEY_PATH as string) ||
  '../../.secrets/private-key.pem'
export const CERT_PUBLIC_KEY_PATH =
  (process.env.CERT_PUBLIC_KEY_PATH as string) ||
  '../../.secrets/public-key.pem'
export const SENTRY_DSN = process.env.SENTRY_DSN

export const PRODUCTION = process.env.NODE_ENV === 'production'
export const QA_ENV = process.env.QA_ENV || false
export const AUTH_URL = process.env.AUTH_URL || 'http://localhost:4040'
export const FHIR_URL = process.env.FHIR_URL || 'http://localhost:3447/fhir'
// Check if the token has been invalided in the auth service before it has expired
// This needs to be a string to make it easy to pass as an ENV var.
export const CHECK_INVALID_TOKEN = process.env.CHECK_INVALID_TOKEN || 'false'
export const REDIS_HOST = process.env.REDIS_HOST || 'localhost'
export const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379', 10)
export const QUEUE_NAME = 'NOTIFY_URL'
export const OPENCRVS_SPECIFICATION_URL = 'http://opencrvs.org/specs/'
export const DEFAULT_TIMEOUT = 600000
