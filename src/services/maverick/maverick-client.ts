import createClient from 'openapi-fetch'

import type { paths } from './generated/maverick-schema'

import { apiUrl, isProd } from '../config'
import { cloudflareHeadersMiddleware } from './cloudflareHeadersMiddleware'
import { errorThrowMiddleware } from './errorThrowMiddleware'

const client = createClient<paths>({
  baseUrl: apiUrl,
  credentials: 'include',
  fetch: fetch,
})

// when not in production, we need to provide the client id and secret
// to allow requests through cloudflare security
if (!isProd) {
  client.use(cloudflareHeadersMiddleware)
}

client.use(errorThrowMiddleware)

export { client }
