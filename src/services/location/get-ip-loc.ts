import type { IpLocation } from './ip-loc.types'

export function getIpAndLoc(request: Request): IpLocation {
  const headers = request.headers

  const ip =
    headers.get('x-gt-ip') ||
    headers.get('cf-connecting-ip') ||
    headers.get('x-real-ip') ||
    headers.get('x-forwarded-for') ||
    ''
  const loc = headers.get('cf-ipcountry') ?? ''

  const latitude =
    headers.get('cf-iplatitude') ?? (request.cf?.latitude as string) ?? ''

  const longitude =
    headers.get('cf-iplongitude') ?? (request.cf?.longitude as string) ?? ''

  return { ip, loc, latitude, longitude }
}
