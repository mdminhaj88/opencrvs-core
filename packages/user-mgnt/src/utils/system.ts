/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * OpenCRVS is also distributed under the terms of the Civil Registration
 * & Healthcare Disclaimer located at http://opencrvs.org/license.
 *
 * Copyright (C) The OpenCRVS Authors. OpenCRVS and the OpenCRVS
 * graphic logo are (registered/a) trademark(s) of Plan International.
 */
import { NATIONAL_ID_OPENID_CONNECT_URL } from '@user-mgnt/constants'
import { ISystemModel } from '@user-mgnt/model/system'
import { pick } from 'lodash'
import { Types } from 'mongoose'

export const types = {
  NATIONAL_ID: 'NATIONAL_ID',
  HEALTH: 'HEALTH',
  RECORD_SEARCH: 'RECORD_SEARCH',
  WEBHOOK: 'WEBHOOK'
}

type MongooseQueriedSystem = ISystemModel & { _id: Types.ObjectId }

const pickSettings = (system: MongooseQueriedSystem) => {
  const openIdConnectUrl =
    system.type === 'NATIONAL_ID' && NATIONAL_ID_OPENID_CONNECT_URL
      ? { openIdConnectUrl: NATIONAL_ID_OPENID_CONNECT_URL }
      : {}

  return { ...openIdConnectUrl }
}

/** Returns a curated `System` with only the params we want to expose */
export const pickSystem = (system: MongooseQueriedSystem) => {
  const directlyPassedParameters = pick(system, ['name', 'status', 'type'])

  return {
    ...directlyPassedParameters,
    _id: system._id.toString(),
    // TODO: client_id and sha_secret should be camelCased in the Mongoose-model
    shaSecret: system.sha_secret,
    clientId: system.client_id,
    settings: pickSettings(system)
  }
}