import createClient from 'openapi-fetch'

import type { paths } from './generated/maverick-schema'

import { isProd, maverickUrl } from '../config'
import { cloudflareHeadersMiddleware } from './cloudflare-headers-middleware'
import { errorThrowMiddleware } from './error-throw-middleware'

// cloudflare workers crash if credentials are set since not in browser
const isCredentialsSupported = 'credentials' in Request.prototype

const serverClient = createClient<paths>({
  baseUrl: maverickUrl,
  credentials: isCredentialsSupported ? 'include' : undefined,
  fetch: fetch,
})

// when not in production, we need to provide the client id and secret
// to allow requests through cloudflare security
if (!isProd) {
  serverClient.use(cloudflareHeadersMiddleware)
}

serverClient.use(errorThrowMiddleware)

export { serverClient }
