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
import { DocumentNode } from 'graphql'

export function isAvailable(
  operationName: string,
  variables: Record<string, any>,
  query: DocumentNode
) {
  return {
    type: 'PERFORMANCE/QUERY_DATA_AVAILABLE' as const,
    payload: {
      operationName,
      variables,
      query
    }
  }
}
export function fetch(
  operationName: string,
  variables: Record<string, any>,
  query: DocumentNode
) {
  return {
    type: 'PERFORMANCE/FETCH_QUERY_DATA' as const,
    payload: {
      operationName,
      variables,
      query
    }
  }
}

export function write(operationName: string, variables: Record<string, any>) {
  return {
    type: 'PERFORMANCE/WRITE_QUERY_DATA' as const,
    payload: {
      operationName,
      variables
    }
  }
}

export function read({
  data,
  operationName,
  variables,
  query
}: {
  data: any
  operationName: string
  variables: Record<string, any>
  query: DocumentNode
}) {
  return {
    type: 'PERFORMANCE/READ_QUERY_DATA' as const,
    payload: {
      data,
      operationName,
      variables,
      query
    }
  }
}

export function fetchSuccess(
  data: any,
  operationName: string,
  variables: Record<string, any>
) {
  return {
    type: 'PERFORMANCE/FETCH_QUERY_DATA_SUCCESS' as const,
    payload: {
      data,
      operationName,
      variables
    }
  }
}

export function fetchFail(
  error: any,
  operationName: string,
  variables: Record<string, any>
) {
  return {
    type: 'PERFORMANCE/FETCH_QUERY_DATA_FAIL' as const,
    payload: {
      error,
      operationName,
      variables
    }
  }
}

export type Action =
  | ReturnType<typeof isAvailable>
  | ReturnType<typeof fetch>
  | ReturnType<typeof write>
  | ReturnType<typeof read>
  | ReturnType<typeof fetchSuccess>
  | ReturnType<typeof fetchFail>