export function buildRequestInit(
  options: RequestInit | undefined,
  headers: Record<string, string>
): RequestInit {
  return {
    ...options,
    headers: {
      ...headers,
      ...(options?.headers instanceof Headers
        ? Object.fromEntries(options.headers)
        : options?.headers),
    },
  };
}
