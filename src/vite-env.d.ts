/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_CLIENT_ID: string
  readonly VITE_API_CLIENT_SECRET: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
