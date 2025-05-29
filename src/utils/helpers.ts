/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChangeEvent } from 'react';
import { UAParser } from 'ua-parser-js';
import type { Listing } from '@/contracts/entities/listing';
import type { components } from '@/contracts/generated/maverick-schema';
import { Display } from '@/contracts/UiVariants';
import { s3Url } from '../services/config';

export function stringUTCDateToLocale(value: string, format = 'en-US'): string {
  return new Intl.DateTimeFormat(format).format(new Date(value));
}

export function formatDate(date?: Date, format?: Intl.DateTimeFormatOptions, locale = 'en-US') {
  if (!date) {
    return '';
  }
  return new Intl.DateTimeFormat(locale, format).format(date);
}

export const arrayOfBooleans = (length: number, value = false): boolean[] =>
  Array.from({ length }).map(() => value);

export function capitalizeFirstLetter(string?: string) {
  if (!string) {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function phoneNumberMask(value: string) {
  let numbers = value.replace(/\D/g, '');
  const char: Record<number, string> = { 0: '(', 3: ') ', 6: '-' };
  let maskedValue = '';

  for (let i = 0; i < numbers.length; i++) {
    maskedValue += (char[i] || '') + numbers[i];
  }

  if (maskedValue.length > 14) {
    maskedValue = maskedValue.slice(0, 14);
  }

  if (numbers.length > 10) {
    numbers = numbers.slice(0, 14);
  }
  return { maskedValue, numbers };
}

export function phoneInputMask(e: ChangeEvent<HTMLInputElement>) {
  e.preventDefault();
  const isSafari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;
  const labelElem = e.target.parentElement?.previousSibling as HTMLElement | null;
  const isTranslated = labelElem?.textContent !== labelElem?.id;

  const { value } = e.target;

  const { maskedValue, numbers } = phoneNumberMask(value);
  if (numbers.length >= 10 && isTranslated && isSafari) {
    return maskedValue;
  }
  if (isTranslated && isSafari) {
    return numbers;
  }
  return maskedValue;
}

export function zipCodeMask(e: ChangeEvent<HTMLInputElement>) {
  const { value } = e.target;
  const numbers = value.replace(/\D/g, '');
  const char: Record<number, string> = { 5: '-' };
  let maskedValue = '';

  for (let i = 0; i < numbers.length; i++) {
    maskedValue += (char[i] || '') + numbers[i];
  }

  if (maskedValue.length > 10) {
    maskedValue = maskedValue.slice(0, 10);
  }

  return maskedValue;
}

export function postalCodeMask(e: ChangeEvent<HTMLInputElement>) {
  const { value } = e.target;
  const cleanValue = value.replace(/\W/g, '');
  const char: Record<number, string> = { 3: ' ' };
  let maskedValue = '';

  for (let i = 0; i < cleanValue.length; i++) {
    maskedValue += (char[i] || '') + cleanValue[i];
  }

  if (maskedValue.length > 7) {
    maskedValue = maskedValue.slice(0, 7);
  }

  return maskedValue;
}

export function validatePhoneNumber(input: string) {
  // Define the pattern for the phone number
  const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;

  // Test the input against the pattern
  return phonePattern.test(input);
}

export function formatCurrency(
  value: number,
  options?: Intl.NumberFormatOptions | Intl.NumberFormatOptions['currency']
) {
  const currency = options
    ? typeof options === 'string'
      ? options
      : (options.currency ?? 'USD')
    : 'USD';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    ...(typeof options !== 'string' ? options : {}),
  }).format(value);
}

export function formatPercentage(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    ...(typeof options !== 'string' ? options : {}),
  }).format(value);
}

export const parseArrayToTree: any = (items: any, id: number, link = 'parentId') =>
  items
    .filter((item: Record<string, null>) => item[link] === id)
    .map((item: { id: any }) => ({
      ...item,
      children: parseArrayToTree(items, item.id),
    }));

export const parseStringToKebabCase = (str: string) =>
  str.toLowerCase().trim().replaceAll('s+', '-').replaceAll('[^A-Za-z0-9\\-]', '');

export const findSection = (
  item: Listing | string,
  sections: components['schemas']['VenueConfigurationSection'][]
) =>
  typeof item === 'string'
    ? sections.find(
        (section) =>
          item === section.svgMapId ||
          item.toLowerCase() === section?.svgMapId?.toLowerCase() ||
          item.toLowerCase().replace('_t', '_s') === section?.svgMapId?.toLowerCase() ||
          item.toLowerCase().replaceAll(/-section|-label/g, '') ===
            section?.svgMapId?.toLowerCase().replaceAll(/-section|-label/g, '') ||
          `${item}-section` === section?.svgMapId ||
          item.toLowerCase() === section?.name?.toLowerCase() ||
          parseInt(item) === section.id ||
          item.toLowerCase() === section?.svgMapId?.toLowerCase()
      )
    : sections.find(
        (section) =>
          item.section === section?.svgMapId ||
          item?.section?.toLowerCase() === section?.svgMapId?.toLowerCase() ||
          item?.section?.toLowerCase().replace('_t', '_s') === section?.svgMapId?.toLowerCase() ||
          `${item.section}-section` === section?.svgMapId ||
          item?.section?.toLowerCase().replaceAll(/-section|-label/g, '') ===
            section?.svgMapId?.toLowerCase().replaceAll(/-section|-label/g, '') ||
          item?.section?.toLowerCase() === section?.name?.toLowerCase() ||
          parseInt(item?.section || '') === section.id ||
          item?.section?.toLowerCase() === section?.svgMapId?.toLowerCase()
      );

export const isValidURL = (str: string) =>
  str.match(
    // eslint-disable-next-line no-useless-escape
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  ) !== null;

export interface ImageApiParams {
  fit?: string;
  height?: number;
  quality?: number;
  trim?: {
    top?: number;
    right?: number;
    left?: number;
    bottom?: number;
  };
  width?: number;
}

export const hasUUID = (fileName: string): boolean => {
  if (!fileName) {
    return false;
  }

  // UUID regex pattern
  const uuidPattern = /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i;

  // Check if the file name contains a UUID
  return uuidPattern.test(fileName);
};

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

export const sanitizeString = (str: string) =>
  str
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
    .toLowerCase();

export const replaceContent = (content: string, replacements: Record<string, string>) =>
  content.replace(
    /(<(ul|ol|table)[\s\S]*?<\/\2>)|\n/g,
    (match: string, _: unknown, tagContent: string, tagName: string) => {
      const handlers: Record<string, (content: string) => string> = {
        ul: (content) => content.replace(/\n/g, ''),
        ol: (content) => content.replace(/\n/g, ''),
        table: (content) => content.replace(/\n/g, ''),
      };

      return handlers[tagName]
        ? `<${tagName}>${handlers[tagName](tagContent)}</${tagName}>`
        : replacements[match as keyof typeof replacements] || match;
    }
  );

export const isMobile = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < Display.lg;
  }

  return false;
};

export const addSlashToSlug = (slug: string) => (slug.indexOf('/') === 0 ? slug : `/${slug}`);

interface UserAgentInfo {
  browserType: string;
  browserVersion: string;
  deviceCategory: string;
  deviceType: string;
  operatingSystem: string;
  operatingSystemVersion: string;
  requestingPlatform: string;
}

export function getUserAgentInfo(): UserAgentInfo {
  const parser =
    typeof window !== 'undefined' && window.navigator && window.navigator.userAgent
      ? new UAParser(navigator.userAgent)
      : undefined;
  if (!parser) {
    return {
      browserType: 'unknown',
      browserVersion: 'unknown',
      operatingSystem: 'unknown',
      operatingSystemVersion: 'unknown',
      deviceCategory: 'Desktop',
      deviceType: 'unknown',
      requestingPlatform: 'None',
    };
  }
  const { browser, os, device } = parser.getResult();
  return {
    browserType: browser.name || 'unknown',
    browserVersion: browser.version || 'unknown',
    operatingSystem: os.name || 'unknown',
    operatingSystemVersion: os.version || 'unknown',
    deviceCategory: device.type || 'Desktop',
    deviceType: device.model || 'unknown',
    requestingPlatform: device.type === 'mobile' ? 'Mobile Site' : 'None',
  };
}
