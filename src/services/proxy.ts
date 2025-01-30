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
    } as unknown as RequestInit
    if (c.req.method === 'POST') {
      fetchOptions.duplex = 'half'
    }
    if (c.req.raw.body) {
      fetchOptions.body = c.req.raw.body
    }
    return fetch(path, fetchOptions)
  }
}
