import type { Context, Handler } from 'hono'

export function basicProxy(target_url = ''): Handler {
  return async (c: Context) => {
    let path = target_url ? target_url + c.req.path : c.req.url
    if (c.req.query()) {
      path = path + '?' + new URLSearchParams(c.req.query())
    }

    const headers = new Headers(c.req.raw.headers)
    headers.delete('host')
    const fetchOptions = {
      method: c.req.method,
      headers: headers,
      body: c.req.method !== 'GET' ? await c.req.arrayBuffer() : undefined,
    } as unknown as RequestInit
    if (c.req.method === 'POST') {
      fetchOptions.duplex = 'half'
    }
    return fetch(path, fetchOptions)
  }
}
