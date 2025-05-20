/* eslint-disable @typescript-eslint/no-explicit-any */
function serializeQueryParams(params: Record<string, any>, prefix?: string): string {
  const pairs: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) {
      continue;
    } // Skip undefined values

    const encodedKey = prefix ? `${prefix}[${encodeURIComponent(key)}]` : encodeURIComponent(key);

    if (Array.isArray(value)) {
      // Handle array by repeating the key
      value.forEach((val) => {
        pairs.push(`${encodedKey}=${encodeURIComponent(val)}`);
      });
    } else if (value !== null && typeof value === 'object') {
      // Recurse into nested objects
      pairs.push(serializeQueryParams(value, encodedKey));
    } else {
      // Handle primitive values
      pairs.push(`${encodedKey}=${encodeURIComponent(value)}`);
    }
  }

  return pairs.join('&');
}
export default serializeQueryParams;
