import { buildRequestInit } from '@/utils/buildRequestInit';
import { buildServerHeaders, buildServerHeadersNoAuth } from '@/utils/buildServerHeaders';

export const serverFetch = (url: string, options: RequestInit | undefined) => {
  const headers: Record<string, string> = buildServerHeaders(options);
  const finalOptions: RequestInit = buildRequestInit(options, headers);

  return fetch(url, finalOptions);
};

export const serverFetchNoAuth = (url: string, options?: RequestInit | undefined) => {
  const headers: Record<string, string> = buildServerHeadersNoAuth();
  const finalOptions: RequestInit = buildRequestInit(options, headers);

  return fetch(url, finalOptions);
};
