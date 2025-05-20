import { useEffect, useState } from 'react';
import { UAParser } from 'ua-parser-js';

export function getDeviceType() {
  const userAgent = navigator.userAgent;

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

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState<'desktop' | 'mobile' | 'unknown' | undefined>(
    undefined
  );

  useEffect(() => {
    setDeviceType(getDeviceType());
  }, []);
  return deviceType;
}
