import type { Context } from 'hono';
import { UAParser } from 'ua-parser-js';
// IMPORT SERVER ONLY
export function getDeviceType(c?: Context) {
  const userAgent = c?.req.header('user-agent');
  if (!userAgent) {
    return 'unknown';
  }
  const device = UAParser(userAgent)?.device;

  switch (device.type) {
    case 'mobile':
      return 'mobile';
    case 'wearable':
    case 'console':
    case 'tablet':
    case 'smarttv':
    case 'embedded':
      return 'unknown';
    default:
      return 'desktop';
  }
}

export type DEVICE_TYPE = ReturnType<typeof getDeviceType>;
