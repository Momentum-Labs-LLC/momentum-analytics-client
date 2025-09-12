// Jest setup file for browser environment simulation
import 'jest-environment-jsdom';

// Mock window.location for testing
Object.defineProperty(window, 'location', {
  value: {
    hostname: 'example.com',
    pathname: '/',
    search: '',
    hash: '',
    href: 'https://example.com/',
    referrer: '',
  },
  writable: true,
});

// Mock document.referrer
Object.defineProperty(document, 'referrer', {
  value: '',
  writable: true,
});

// Mock URLSearchParams for older environments
if (!global.URLSearchParams) {
  (global as any).URLSearchParams = class URLSearchParams {
    private params: Map<string, string> = new Map();

    constructor(init?: string | URLSearchParams | Record<string, string>) {
      if (typeof init === 'string') {
        init.split('&').forEach(pair => {
          const [key, value] = pair.split('=');
          if (key) this.params.set(decodeURIComponent(key), decodeURIComponent(value || ''));
        });
      } else if (init instanceof URLSearchParams) {
        init.forEach((value, key) => this.params.set(key, value));
      } else if (init && typeof init === 'object') {
        Object.entries(init).forEach(([key, value]) => this.params.set(key, value));
      }
    }

    forEach(callback: (value: string, key: string) => void) {
      this.params.forEach(callback);
    }

    get(name: string): string | null {
      return this.params.get(name) || null;
    }

    set(name: string, value: string) {
      this.params.set(name, value);
    }

    has(name: string): boolean {
      return this.params.has(name);
    }

    delete(name: string) {
      this.params.delete(name);
    }
  };
}
