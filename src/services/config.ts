export const basePath =
  import.meta.env.VITE_BASE_PATH ?? 'http://localhost:5173'
export const mapsUrl =
  import.meta.env.VITE_MAP_URL ?? 'https://maverick-svg-maps.s3.amazonaws.com'
export const isProd = import.meta.env.VITE_APP_ENV === 'production'

export const maverickUrl =
  import.meta.env.VITE_MAVERICK_URL ??
  'https://maverick-public-services-stage.dev.gotickets.com'

export const apiUrl =
  import.meta.env.VITE_API_URL ??
  'https://maverick-public-services-stage.dev.gotickets.com'

export const s3Url =
  import.meta.env.VITE_S3_URL ?? 'https://static.gotickets.com'
export const siteName = import.meta.env.VITE_NAME ?? 'GoTickets'
export const secondChanceUrl =
  import.meta.env.VITE_EVENTTICKETPROTECTION_URL ??
  'https://uat.eventticketprotection.com/gotickets/home'
export const supportPhoneNumber =
  import.meta.env.VITE_SUPPORT_PHONE_NUMBER ?? '(877) 698-0117'
export const googleMapsApiKey =
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
  'AIzaSyBYwyaYBGkHrOlVX1fW3UjKuYlD09shNFQ'
export const VERCEL_ENV = import.meta.env.VITE_VERCEL_ENV

export const gbClientKey =
  import.meta.env.VITE_GB_CLIENT_KEY ?? 'sdk-nBR0cXqdj9rICERK'
