/// <reference types="vite/client" />
/// <reference types="pinia-plugin-persistedstate" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_BASE_URL: string;
    readonly VITE_REQUEST_URL: string;
    readonly VITE_PORT: number;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
