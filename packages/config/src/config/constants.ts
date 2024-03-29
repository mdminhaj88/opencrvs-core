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
export const OPENCRVS_SPECIFICATION_URL = 'http://opencrvs.org/specs/'
export const HOST = process.env.HOST || 'localhost'
export const HOSTNAME = process.env.DOMAIN || '*'
export const LOGIN_URL = process.env.LOGIN_URL || 'http://localhost:3020/'
export const CLIENT_APP_URL =
  process.env.CLIENT_APP_URL || 'http://localhost:3000/'
export const PORT = process.env.PORT || 2021
// Services
export const GATEWAY_URL = process.env.GATEWAY_URL || 'http://localhost:7070/'
export const SEARCH_URL = process.env.SEARCH_URL || 'http://localhost:9090/'
export const METRICS_URL = process.env.METRICS_URL || 'http://localhost:1050'
export const AUTH_URL = process.env.AUTH_URL || 'http://localhost:4040'
export const COUNTRY_CONFIG_URL =
  process.env.COUNTRY_CONFIG_URL || 'http://localhost:3040'
export const MONGO_URL =
  process.env.MONGO_URL || 'mongodb://localhost/application-config'
export const USER_MANAGEMENT_URL =
  process.env.USER_MANAGEMENT_URL || 'http://localhost:3030'
export const DOCUMENTS_URL =
  process.env.DOCUMENTS_URL || 'http://localhost:9050'
export const SENTRY_DSN = process.env.SENTRY_DSN
export const CERT_PUBLIC_KEY_PATH =
  (process.env.CERT_PUBLIC_KEY_PATH as string) ||
  '../../.secrets/public-key.pem'
export const PRODUCTION = process.env.NODE_ENV === 'production'
export const QA_ENV = process.env.QA_ENV || false

// Check if the token has been invalided in the auth service before it has expired
// This needs to be a string to make it easy to pass as an ENV var.
export const CHECK_INVALID_TOKEN = process.env.CHECK_INVALID_TOKEN || 'false'
export const DEFAULT_TIMEOUT = 600000

export const enum LOCATION_LEVEL {
  HEALTH_FACILITY = 'HEALTH_FACILITY',
  STATE = 'STATE',
  DISTRICT = 'DISTRICT',
  LOCATION_LEVEL_3 = 'LOCATION_LEVEL_3',
  LOCATION_LEVEL_4 = 'LOCATION_LEVEL_4',
  LOCATION_LEVEL_5 = 'LOCATION_LEVEL_5'
}
