export const getFetchUrl = (route: string) =>
  `${
    process.env.NODE_ENV === 'production'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://127.0.0.1:3000'
  }/${route}`;
