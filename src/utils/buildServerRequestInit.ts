import { buildRequestInit } from '@/utils/buildRequestInit';
import { buildServerHeaders, buildServerHeadersNoAuth } from '@/utils/buildServerHeaders';

/**
 * Generates a RequestInit object for server requests. Merges
 * provided options with default headers. For use with fetch calls
 * that are made on the server to ensure that the request includes
 * the necessary headers.
 *
 * @param options - Optional RequestInit object to customize the request.
 * @param skipAuth - Optional boolean to skip authentication headers. Useful for cached requests.
 * @returns The generated RequestInit object.
 */
export function buildServerRequestInit(options?: RequestInit, skipAuth?: boolean) {
  const headers = skipAuth ? buildServerHeadersNoAuth() : buildServerHeaders(options);
  const requestInit = buildRequestInit(options, headers);
  return requestInit;
}
