/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string;
  readonly VITE_ENABLE_ANALYTICS?: string;
  readonly VITE_FEATURE_NEW_CHECKOUT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

