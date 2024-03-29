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
import { readFileSync } from 'fs'
import * as jwt from 'jsonwebtoken'
import {
  indexComposition,
  updateComposition
} from '@search/elasticsearch/dbhelper'
import { createServer } from '@search/server'
import {
  mockBirthFhirBundleWithoutCompositionId,
  mockBirthRejectionTaskBundleWithoutCompositionReference,
  mockCompositionEntry,
  mockCompositionResponse,
  mockSearchResponse,
  mockEncounterResponse,
  mockUserModelResponse,
  mockBirthFhirBundle
} from '@search/test/utils'
import * as fetchMock from 'jest-fetch-mock'
import { searchForBirthDuplicates } from '@search/features/registration/deduplicate/service'

const fetch: fetchMock.FetchMock = fetchMock as fetchMock.FetchMock

jest.mock('@search/elasticsearch/dbhelper.ts')
jest.mock('@search/features/registration/deduplicate/service')

describe('Verify handlers', () => {
  let server: any

  describe('birthEventHandler', () => {
    beforeEach(async () => {
      server = await createServer()
    })

    it('should return status code 500 if invalid payload received', async () => {
      const token = jwt.sign({}, readFileSync('./test/cert.key'), {
        algorithm: 'RS256',
        issuer: 'opencrvs:auth-service',
        audience: 'opencrvs:search-user'
      })

      const res = await server.server.inject({
        method: 'POST',
        url: '/events/birth/new-declaration',
        payload: {},
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      expect(res.statusCode).toBe(500)
    })

    it('should return status code 200 if the event data is updated with task', async () => {
      ;(updateComposition as jest.Mock).mockReturnValue({})

      fetch.mockResponses(
        [JSON.stringify(mockEncounterResponse), { status: 200 }],
        [
          JSON.stringify({ partOf: { reference: 'Location/123' } }),
          { status: 200 }
        ],
        [
          JSON.stringify({ partOf: { reference: 'Location/0' } }),
          { status: 200 }
        ],
        [JSON.stringify(mockUserModelResponse), { status: 200 }],
        [
          JSON.stringify({ partOf: { reference: 'Location/123' } }),
          { status: 200 }
        ],
        [JSON.stringify(mockEncounterResponse), { status: 200 }],
        [
          JSON.stringify({ partOf: { reference: 'Location/123' } }),
          { status: 200 }
        ],
        [
          JSON.stringify({ partOf: { reference: 'Location/0' } }),
          { status: 200 }
        ],
        [JSON.stringify(mockUserModelResponse), { status: 200 }],
        [
          JSON.stringify({ partOf: { reference: 'Location/123' } }),
          { status: 200 }
        ],
        [
          JSON.stringify({ partOf: { reference: 'Location/0' } }),
          { status: 200 }
        ]
      )

      const token = jwt.sign({}, readFileSync('./test/cert.key'), {
        algorithm: 'RS256',
        issuer: 'opencrvs:auth-service',
        audience: 'opencrvs:search-user'
      })

      const res = await server.server.inject({
        method: 'POST',
        url: '/record',
        payload: mockBirthFhirBundle,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      expect(res.statusCode).toBe(200)
    })

    it('500 if the event data is updated with a task where there is no focus reference for Composition', async () => {
      const token = jwt.sign({}, readFileSync('./test/cert.key'), {
        algorithm: 'RS256',
        issuer: 'opencrvs:auth-service',
        audience: 'opencrvs:search-user'
      })

      const res = await server.server.inject({
        method: 'POST',
        url: '/events/birth/mark-voided',
        payload: mockBirthRejectionTaskBundleWithoutCompositionReference,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      expect(res.statusCode).toBe(500)
    })

    it('should return status code 500 when composition has no ID', async () => {
      ;(indexComposition as jest.Mock).mockReturnValue({})
      ;(searchForBirthDuplicates as jest.Mock).mockReturnValue(
        mockSearchResponse.body.hits.hits
      )
      ;(updateComposition as jest.Mock).mockReturnValue({})
      fetch.mockResponses(
        [JSON.stringify(mockCompositionResponse), { status: 200 }],
        [JSON.stringify(mockCompositionEntry), { status: 200 }],
        [JSON.stringify(mockCompositionEntry), { status: 200 }],
        [JSON.stringify({}), { status: 200 }]
      )
      const token = jwt.sign({}, readFileSync('./test/cert.key'), {
        algorithm: 'RS256',
        issuer: 'opencrvs:auth-service',
        audience: 'opencrvs:search-user'
      })

      const res = await server.server.inject({
        method: 'POST',
        url: '/events/birth/new-declaration',
        payload: mockBirthFhirBundleWithoutCompositionId,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      expect(res.statusCode).toBe(500)
    })
  })
})
