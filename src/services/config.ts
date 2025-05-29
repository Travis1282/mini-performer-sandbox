// Essential configuration values (only those actually used in the codebase)
export const isProd = import.meta.env.VITE_APP_ENV === 'production';
export const s3Url = import.meta.env.VITE_S3_URL ?? 'https://static.gotickets.com';
export const VERCEL_ENV = import.meta.env.VITE_VERCEL_ENV;
