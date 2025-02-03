import type { paths } from './generated/maverick-schema'
import { client } from './maverick-client'

export interface PostSessionsOptions {
  body: paths['/rest/sessions']['post']['requestBody']['content']['application/json']
  init?: Omit<RequestInit, 'body'>
  params?: paths['/rest/sessions']['post']['parameters']
}

export function postSessions({ init = {}, params, body }: PostSessionsOptions) {
  return client().POST('/rest/sessions', {
    init: {
      ...init,
      duplex: true,
    },
    params,
    body,
  })
}
