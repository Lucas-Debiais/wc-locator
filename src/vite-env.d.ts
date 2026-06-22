/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  /** Public Mapbox access token (pk.*) used by the map. */
  readonly VITE_MAPBOX_TOKEN: string
  /** OpenDataSoft API key for the Nantes toilets dataset (read-only). */
  readonly VITE_NANTES_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
