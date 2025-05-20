import type { Region } from '@/contracts/entities/region';
import type { components } from '@/contracts/generated/maverick-schema';
import Cookies from 'js-cookie';

export function getIpAndLoc(request?: Request): {
  ip: string;
  loc: string;
  latitude: null | string;
  longitude: null | string;
} {
  if (!request) {
    return { ip: '', loc: '', latitude: null, longitude: null };
  }

  const ip =
    request.headers.get('x-gt-ip') ||
    request.headers.get('x-vercel-forwarded-for') ||
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-real-ip') ||
    request.headers.get('x-forwarded-for') ||
    '';
  const loc =
    request.headers.get('cf-ipcountry') || request.headers.get('x-vercel-ip-country') || '';

  const latitude =
    request.headers.get('cf-iplatitude') || request.headers.get('x-vercel-ip-latitude') || null;

  const longitude =
    request.headers.get('cf-iplongitude') || request.headers.get('x-vercel-ip-longitude') || null;

  return { ip, loc, latitude, longitude };
}

export function searchParams(request?: Request): false | URLSearchParams {
  if (!request) {
    return false;
  }

  const refererUrl = request.headers.get('referer');
  const url = refererUrl && /^https?:\/\//.test(refererUrl) ? refererUrl : `https://${refererUrl}`;
  const urlObject = refererUrl && (new URL(url) as null | URL);
  const searchParams = urlObject?.search;
  return !!searchParams && new URLSearchParams(searchParams as string);
}

export const DEV_REGION: false | Region = process.env.NODE_ENV !== 'production' && {
  id: 1,
  name: 'Chicago',
  latitude: 41.880683,
  longitude: -87.674185,
  venueRadius: 80,
  heroImagePath: 'ee2f2834-a9d8-4502-a8bd-6496f4418a1f.webp',
  slug: 'chicago-events',
};

export const DEFAULT_REGION: Region = {
  id: 0,
  name: 'All regions',
  latitude: 41.880683,
  longitude: -87.674185,
  venueRadius: 80,
  heroImagePath: 'ee2f2834-a9d8-4502-a8bd-6496f4418a1f.webp',
  slug: '/',
};

export function getSearchParams(request?: Request) {
  if (!request) {
    return new URLSearchParams();
  }

  const originalUrl = request.headers.get('X-Go-Original-Url');
  if (!originalUrl) {
    return new URLSearchParams();
  }
  const url = new URL(originalUrl);

  return url.searchParams;
}

export function getPathname(request?: Request) {
  if (!request) {
    return undefined;
  }

  const originalUrl = request.headers.get('X-Go-Original-Url');
  if (!originalUrl) {
    return undefined;
  }
  const url = new URL(originalUrl);

  return url.pathname;
}

export function getCookies(): {
  trendingRegion: Region;
  nearRegion?: Region;
  accessToken?: string;
  profile?: components['schemas']['Customer'];
  cookieConsented: boolean;
} {
  const trendingRegionAsString = Cookies.get('trending-region') || '';
  const trendingRegion = trendingRegionAsString ? JSON.parse(trendingRegionAsString) : undefined;
  const accessToken = Cookies.get('accessToken');
  const profileAsString = Cookies.get('profile');
  const profile = profileAsString ? JSON.parse(profileAsString) : undefined;
  const cookieConsented = Cookies.get('cookieConsented') === 'true';

  return {
    trendingRegion,
    accessToken,
    profile,
    cookieConsented,
  };
}
