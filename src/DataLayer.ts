export {};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    adobeDataLayer?: Record<string, unknown>[];
  }
}