import type { IpLocation } from './ip-loc.types';

export function getIpAndLoc(
  request: Request & { cf?: { latitude?: string; longitude?: string } }
): IpLocation {
  const headers = request.headers;

  const ip =
    headers.get('x-gt-ip') ??
    headers.get('cf-connecting-ip') ??
    headers.get('x-real-ip') ??
    headers.get('x-forwarded-for') ??
    undefined;
  const loc = headers.get('cf-ipcountry') ?? undefined;

  const latitude = headers.get('cf-iplatitude') ?? (request.cf?.latitude as string) ?? undefined;

  const longitude = headers.get('cf-iplongitude') ?? (request.cf?.longitude as string) ?? undefined;

  return { ip, loc, latitude, longitude };
}
