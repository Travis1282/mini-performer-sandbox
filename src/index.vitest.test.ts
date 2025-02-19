// @vitest-environment node

import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest'
import app from './index'
import { server } from './mocks/node'

describe('Example', () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'warn' })
  })
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test('GET /', async () => {
    const res = await app.request('/')
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('text/html; charset=UTF-8')
    expect(res.headers.get('X-Go-Session-Id')).toBe(
      'c10d9a5d-92e8-4681-b1e1-91ec0fb7c1bd'
    )
    expect(res.headers.get('X-Go-Profile-Id')).toBe(
      'b3ce35f9-b388-439c-b583-b77b7a5141d6'
    )

    const setCookiesHeaders = res.headers.getSetCookie()

    const expectedCookieHeaders = [
      'gt_sid=c10d9a5d-92e8-4681-b1e1-91ec0fb7c1bd; Path=/; Secure; SameSite=None',
      'gt_pid=b3ce35f9-b388-439c-b583-b77b7a5141d6; Max-Age=7776000; Path=/; Secure; SameSite=None',
      'gt_pdt=eyJwcm9maWxlSWQiOiIyODk5MGFhMy0wZDc3LTQxZWUtYTk5MC1jMTQ5OTgwNGEwZTYiLCJ1cmwiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMvIiwidXNlckFnZW50IjoiTW96aWxsYS81LjAgKGlQaG9uZTsgQ1BVIGlQaG9uZSBPUyAxN180XzEgbGlrZSBNYWMgT1MgWCkgQXBwbGVXZWJLaXQvNjA1LjEuMTUgKEtIVE1MLCBsaWtlIEdlY2tvKSBWZXJzaW9uLzE3LjQuMSBNb2JpbGUvMTVFMTQ4IFNhZmFyaS82MDQuMSIsInJlZmVycmVyIjoiaHR0cDovL2xvY2FsaG9zdDo1MTczLyJ9; Path=/',
      'gt_sdt=N4d6VD2xkmaziteJZOeuAx0tfcCSD4jUrzGsNnueeYS8-_subYjp-sC9RfaEfeojcdBRfyb_jerydnmdvrz8E_PD_6XIE3XVprE0S_pikm39tQAvZDLjuKBtn7Tcy1Ils5BWi8SVSO2FbTVww4zUCfLkrriokX_dYI76S5wgn9Kd14K5ZiYLnTuiRathdwX798E_HarokGEQxf-Hos3aOwduonsq4Mh_DQ6ODqsSj8o.7tDChdJOA2MPAfQIdA974-zwab7x9M6tEzH1evpdDdw; Path=/',
      'gt_up=e30%3D; Max-Age=7776000; Path=/',
      'gt_closest_region=0; Path=/',
    ]

    for (const header of setCookiesHeaders) {
      expect(header).toBe(expectedCookieHeaders.shift())
    }
  })

  test('GET / with ppc', async () => {
    const res = await app.request(
      '/?fv=1&region=1&utm_medium=cpc&utm_source=google'
    )
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('text/html; charset=UTF-8')
    expect(res.headers.get('X-Go-Session-Id')).toBe(
      'c10d9a5d-92e8-4681-b1e1-91ec0fb7c1bd'
    )
    expect(res.headers.get('X-Go-Profile-Id')).toBe(
      'b3ce35f9-b388-439c-b583-b77b7a5141d6'
    )

    const setCookiesHeaders = res.headers.getSetCookie()

    const expectedCookieHeaders = [
      'gt_sid=c10d9a5d-92e8-4681-b1e1-91ec0fb7c1bd; Path=/; Secure; SameSite=None',
      'gt_pid=b3ce35f9-b388-439c-b583-b77b7a5141d6; Max-Age=7776000; Path=/; Secure; SameSite=None',
      'gt_pdt=eyJwcm9maWxlSWQiOiIyODk5MGFhMy0wZDc3LTQxZWUtYTk5MC1jMTQ5OTgwNGEwZTYiLCJ1cmwiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMvIiwidXNlckFnZW50IjoiTW96aWxsYS81LjAgKGlQaG9uZTsgQ1BVIGlQaG9uZSBPUyAxN180XzEgbGlrZSBNYWMgT1MgWCkgQXBwbGVXZWJLaXQvNjA1LjEuMTUgKEtIVE1MLCBsaWtlIEdlY2tvKSBWZXJzaW9uLzE3LjQuMSBNb2JpbGUvMTVFMTQ4IFNhZmFyaS82MDQuMSIsInJlZmVycmVyIjoiaHR0cDovL2xvY2FsaG9zdDo1MTczLyJ9; Path=/',
      'gt_sdt=N4d6VD2xkmaziteJZOeuAx0tfcCSD4jUrzGsNnueeYS8-_subYjp-sC9RfaEfeojcdBRfyb_jerydnmdvrz8E_PD_6XIE3XVprE0S_pikm39tQAvZDLjuKBtn7Tcy1Ils5BWi8SVSO2FbTVww4zUCfLkrriokX_dYI76S5wgn9Kd14K5ZiYLnTuiRathdwX798E_HarokGEQxf-Hos3aOwduonsq4Mh_DQ6ODqsSj8o.7tDChdJOA2MPAfQIdA974-zwab7x9M6tEzH1evpdDdw; Path=/',
      'gt_up=eyJ1dG1fc291cmNlIjoiZ29vZ2xlIiwidXRtX21lZGl1bSI6ImNwYyJ9; Max-Age=7776000; Path=/',
      'gt_closest_region=0; Path=/',
    ]

    for (const header of setCookiesHeaders) {
      expect(header).toBe(expectedCookieHeaders.shift())
    }
  })

  test('GET / with ppc existing cookies', async () => {
    const res = await app.request(
      '/?fv=1&region=1&utm_medium=cpc&utm_source=google',
      {
        headers: {
          Cookie:
            'gt_sid=c10d9a5d-92e8-4681-b1e1-91ec0fb7c1bd; gt_pid=b3ce35f9-b388-439c-b583-b77b7a5141d6; gt_up=eyJ1dG1fc291cmNlIjoiZ29vZ2xlIiwidXRtX21lZGl1bSI6ImNwYyJ9; gt_closest_region=0',
        },
      }
    )
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('text/html; charset=UTF-8')

    const setCookiesHeaders = res.headers.getSetCookie()

    const expectedCookieHeaders = [
      'gt_up=eyJ1dG1fc291cmNlIjoiZ29vZ2xlIiwidXRtX21lZGl1bSI6ImNwYyJ9; Max-Age=7776000; Path=/',
      'gt_closest_region=0; Path=/',
    ]

    for (const header of setCookiesHeaders) {
      expect(header).toBe(expectedCookieHeaders.shift())
    }
  })

  test.only('GET / with ppc existing cookies but new ppc params', async () => {
    const res = await app.request(
      '/?fv=1&region=1&utm_medium=cpc&utm_source=bing',
      {
        headers: {
          Cookie:
            'gt_sid=c10d9a5d-92e8-4681-b1e1-91ec0fb7c1bd; gt_pid=b3ce35f9-b388-439c-b583-b77b7a5141d6; gt_up=eyJ1dG1fc291cmNlIjoiZ29vZ2xlIiwidXRtX21lZGl1bSI6ImNwYyJ9; gt_closest_region=0',
        },
      }
    )
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('text/html; charset=UTF-8')

    expect(res.headers.get('X-Go-Session-Id')).toBe(
      'c10d9a5d-92e8-4681-b1e1-91ec0fb7c1bd'
    )
    expect(res.headers.get('X-Go-Profile-Id')).toBe(
      'b3ce35f9-b388-439c-b583-b77b7a5141d6'
    )

    const setCookiesHeaders = res.headers.getSetCookie()

    const expectedCookieHeaders = [
      'gt_sid=c10d9a5d-92e8-4681-b1e1-91ec0fb7c1bd; Path=/; Secure; SameSite=None',
      'gt_pid=b3ce35f9-b388-439c-b583-b77b7a5141d6; Max-Age=7776000; Path=/; Secure; SameSite=None',
      'gt_pdt=eyJwcm9maWxlSWQiOiIyODk5MGFhMy0wZDc3LTQxZWUtYTk5MC1jMTQ5OTgwNGEwZTYiLCJ1cmwiOiJodHRwOi8vbG9jYWxob3N0OjUxNzMvIiwidXNlckFnZW50IjoiTW96aWxsYS81LjAgKGlQaG9uZTsgQ1BVIGlQaG9uZSBPUyAxN180XzEgbGlrZSBNYWMgT1MgWCkgQXBwbGVXZWJLaXQvNjA1LjEuMTUgKEtIVE1MLCBsaWtlIEdlY2tvKSBWZXJzaW9uLzE3LjQuMSBNb2JpbGUvMTVFMTQ4IFNhZmFyaS82MDQuMSIsInJlZmVycmVyIjoiaHR0cDovL2xvY2FsaG9zdDo1MTczLyJ9; Path=/',
      'gt_sdt=N4d6VD2xkmaziteJZOeuAx0tfcCSD4jUrzGsNnueeYS8-_subYjp-sC9RfaEfeojcdBRfyb_jerydnmdvrz8E_PD_6XIE3XVprE0S_pikm39tQAvZDLjuKBtn7Tcy1Ils5BWi8SVSO2FbTVww4zUCfLkrriokX_dYI76S5wgn9Kd14K5ZiYLnTuiRathdwX798E_HarokGEQxf-Hos3aOwduonsq4Mh_DQ6ODqsSj8o.7tDChdJOA2MPAfQIdA974-zwab7x9M6tEzH1evpdDdw; Path=/',
      'gt_up=eyJ1dG1fc291cmNlIjoiYmluZyIsInV0bV9tZWRpdW0iOiJjcGMifQ%3D%3D; Max-Age=7776000; Path=/',
      'gt_closest_region=0; Path=/',
    ]

    for (const header of setCookiesHeaders) {
      expect(header).toBe(expectedCookieHeaders.shift())
    }
  })
})
