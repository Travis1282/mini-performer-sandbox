import type { FeatureApiResponse } from '@growthbook/growthbook';

declare global {
  interface Window {
    __GT_GB_PAYLOAD__: FeatureApiResponse;
    __GT_LOC__: {
      ip: string;
      loc: string;
      latitude: string;
      longitude: string;
      closestRegionId: string;
    };
    clarity?: (type: string, event: string, value?: string | string[]) => void;
  }
}

const waitForClarity = (): Promise<typeof window.clarity | undefined> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.clarity) {
      resolve(window.clarity);
      return;
    }

    const checkClarity = setInterval(() => {
      if (typeof window !== 'undefined' && window.clarity) {
        clearInterval(checkClarity);
        resolve(window.clarity);
      }
    }, 200);

    setTimeout(() => {
      clearInterval(checkClarity);
      resolve(window.clarity);
    }, 5000);
  });
};

export const sendEventToClarity = async (event: string) => {
  const clarity = await waitForClarity();
  if (typeof clarity === 'function') {
    clarity('event', event);
  }
};

export const sendTagToClarity = async (key: string, value: string | string[]) => {
  const clarity = await waitForClarity();
  if (typeof clarity === 'function') {
    clarity('set', key, value);
  }
};
