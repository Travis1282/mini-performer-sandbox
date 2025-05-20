import type { ImageApiParams } from './images.types';

import { s3Url } from '../config';
import { hasUUID } from '../files/has-uuid';

export const resolveImagePath = (str: string | undefined, loaderParams?: ImageApiParams) => {
  if (!str) {
    return '';
  }
  const baseUrl = s3Url;

  if (str.startsWith(`${baseUrl}`)) {
    str = str.replace(`${baseUrl}`, '');
  }

  const params = [];
  params.push(`format=auto`);

  //only use the device pixel ratio if the image is a UUID because we get a hydration error for server side rendered images
  const devicePixelRatio =
    hasUUID(str) && typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

  if (loaderParams?.width) {
    params.push(`width=${Math.ceil(loaderParams.width * devicePixelRatio)}`);
  } else if (!loaderParams?.height) {
    params.push(`width=${Math.ceil(640 * devicePixelRatio)}`);
  }

  if (loaderParams?.height) {
    params.push(`height=${Math.ceil(loaderParams.height * devicePixelRatio)}`);
  }

  params.push(`quality=${loaderParams?.quality || 90}`);

  params.push(`fit=${loaderParams?.fit || 'scale-down'}`);

  if (loaderParams?.trim) {
    Object.entries(loaderParams.trim).forEach(([key, value]) => {
      params.push(`trim.${key}=${value}`);
    });
  }

  return `${baseUrl}/cdn-cgi/image/${params.join(',')}${str.startsWith('/') ? str : `/${str}`}`;
};
