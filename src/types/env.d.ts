interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_ENCRYPT_KEY: string
  readonly VITE_FB_API: string
  readonly VITE_FB_ID: string
  readonly VITE_FB_MESSAGE_SENDER_ID: string
  readonly VITE_FB_APP_ID: string
  readonly VITE_FB_MEASUREMENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}