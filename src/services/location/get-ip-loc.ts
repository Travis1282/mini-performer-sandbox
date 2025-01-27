export function getIpAndLoc(request: Request): {
  ip: string
  loc: string
  latitude: null | string
  longitude: null | string
} {
  const headers = request.headers
  for (const [key, value] of headers.entries()) {
    console.log(`${key}: ${value}`)
  }

  const ip =
    headers.get('x-gt-ip') ||
    headers.get('cf-connecting-ip') ||
    headers.get('x-real-ip') ||
    headers.get('x-forwarded-for') ||
    ''
  const loc = headers.get('cf-ipcountry') ?? ''

  const latitude = headers.get('cf-iplatitude')

  const longitude = headers.get('cf-iplongitude')

  return { ip, loc, latitude, longitude }
}
