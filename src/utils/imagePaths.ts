import { DisplaySizes } from '@/contracts/UiVariants';
import type { ImageApiParams } from './helpers';
import { s3Url } from './config';

export const resolveCdnPath = (str: string | undefined, loaderParams?: ImageApiParams) => {
  if (!str) {
    return '';
  }
  const baseUrl = s3Url;

  if (str.startsWith(`${baseUrl}`)) {
    str = str.replace(`${baseUrl}`, '');
  }

  const params = [];
  params.push(`format=auto`);

  if (loaderParams?.width) {
    params.push(`width=${loaderParams.width}`);
  }

  if (loaderParams?.height) {
    params.push(`height=${loaderParams.height}`);
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

export function generateSrcSetValue(src?: string, loaderParams?: ImageApiParams) {
  const srcSetValues: string[] = [];

  if (!src) {
    return srcSetValues;
  }

  for (const [, width] of DisplaySizes) {
    srcSetValues.push(`${resolveCdnPath(src, { ...loaderParams, width })} ${width}w`);
  }

  return srcSetValues;
}
