import type { Context } from 'hono';
import { getCookie } from 'hono/cookie';

export function buildServerHeaders(options?: RequestInit | undefined, request?: Context) {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'request-location-origin': 'server',
  };

  // Add Cloudflare headers if not in production
  if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
    headers['CF-Access-Client-Id'] = process.env.API_CLIENT_ID || '';
    headers['CF-Access-Client-Secret'] = process.env.API_CLIENT_SECRET || '';
  }

  // Get IP from request headers if available
  if (request) {
    const ip =
      request.req.header('x-gt-ip') ||
      request.req.header('cf-connecting-ip') ||
      request.req.header('x-real-ip') ||
      request.req.header('x-forwarded-for') ||
      '';

    if (ip) {
      headers['x-gt-ip'] = ip;
      headers['x-forwarded-for'] = ip;
    }
  }

  // Add Authorization header if access token is available
  const accessToken = request ? getCookie(request, 'accessToken') : undefined;
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  // Add cookies if available
  const cookieNames = [
    'Fgp_sc',
    'Jwt_sc',
    'gt_sid',
    'gt_pid',
    '_ga',
    '_gid',
    'gt_exp',
    'gt_sdt',
    'gt_pdt',
  ];

  if (request) {
    const existingCookies = options?.headers
      ? new Headers(options.headers).get('Cookie') || ''
      : '';
    const cookieHeader = cookieNames.reduce((acc, name) => {
      const value = getCookie(request, name);
      return value ? `${acc}${acc ? '; ' : ''}${name}=${value}` : acc;
    }, existingCookies);

    if (cookieHeader) {
      headers.Cookie = cookieHeader;
    }
  }

  return headers;
}

export function buildServerHeadersNoAuth() {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'request-location-origin': 'server',
  };

  if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
    headers['CF-Access-Client-Id'] = process.env.API_CLIENT_ID || '';
    headers['CF-Access-Client-Secret'] = process.env.API_CLIENT_SECRET || '';
  }

  return headers;
}
