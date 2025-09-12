import { PageViewReporter } from '../PageViewReporter';
import { IAnalyticsApiClient } from '../AnalyticsApiClient';
import { IAnalyticsCookie } from '../AnalyticsCookieProvider';

// Mock the analytics client
const mockAnalyticsClient: jest.Mocked<IAnalyticsApiClient> = {
  SendPageViewAsync: jest.fn().mockResolvedValue(undefined),
  SendPiiAsync: jest.fn().mockResolvedValue(undefined),
};

// Helper function to set up window.location for testing
function setupWindowLocation(overrides: Partial<Location> = {}) {
  const defaultLocation = {
    hostname: 'example.com',
    pathname: '/',
    search: '',
    hash: '',
    href: 'https://example.com/',
    referrer: '',
  };

  Object.defineProperty(window, 'location', {
    value: { ...defaultLocation, ...overrides },
    writable: true,
  });
}

// Helper function to set up document.referrer for testing
function setupDocumentReferrer(referrer: string) {
  Object.defineProperty(document, 'referrer', {
    value: referrer,
    writable: true,
  });
}

describe('PageViewReporter', () => {
  let pageViewReporter: PageViewReporter;
  let mockCookie: IAnalyticsCookie;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Create fresh instance
    pageViewReporter = new PageViewReporter(mockAnalyticsClient);
    
    // Default mock cookie
    mockCookie = {
      // Add any required cookie properties here
    } as IAnalyticsCookie;

    // Default window setup
    setupWindowLocation();
    setupDocumentReferrer('');
  });

  describe('ReportAsync', () => {
    it('should send page view with correct basic data', async () => {
      setupWindowLocation({
        hostname: 'test.com',
        pathname: '/home',
        search: '',
        hash: '',
      });

      await pageViewReporter.ReportAsync(mockCookie);

      expect(mockAnalyticsClient.SendPageViewAsync).toHaveBeenCalledWith({
        referer: '',
        utmParameters: {},
        domain: 'test.com',
        path: '/home',
        otherParameters: {},
        funnelStep: 0,
      });
    });

    it('should include referrer when available', async () => {
      setupDocumentReferrer('https://google.com');
      setupWindowLocation({
        hostname: 'test.com',
        pathname: '/page',
      });

      await pageViewReporter.ReportAsync(mockCookie);

      expect(mockAnalyticsClient.SendPageViewAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          referer: 'https://google.com',
        })
      );
    });

    it('should parse UTM parameters correctly', async () => {
      setupWindowLocation({
        hostname: 'test.com',
        pathname: '/page',
        search: '?utm_source=google&utm_medium=cpc&utm_campaign=test&other_param=value',
      });

      await pageViewReporter.ReportAsync(mockCookie);

      expect(mockAnalyticsClient.SendPageViewAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          utmParameters: {
            utm_source: 'google',
            utm_medium: 'cpc',
            utm_campaign: 'test',
          },
          otherParameters: {
            other_param: 'value',
          },
        })
      );
    });

    it('should set funnel step to 1 for donate-now pages', async () => {
      setupWindowLocation({
        hostname: 'test.com',
        pathname: '/donate-now',
      });

      await pageViewReporter.ReportAsync(mockCookie);

      expect(mockAnalyticsClient.SendPageViewAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          funnelStep: 1,
        })
      );
    });

    it('should set funnel step to 0 for non-donate-now pages', async () => {
      setupWindowLocation({
        hostname: 'test.com',
        pathname: '/other-page',
      });

      await pageViewReporter.ReportAsync(mockCookie);

      expect(mockAnalyticsClient.SendPageViewAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          funnelStep: 0,
        })
      );
    });
  });

  describe('Hash character (#) impact on path values', () => {
    it('should NOT include hash fragment in path when using pathname', async () => {
      setupWindowLocation({
        hostname: 'test.com',
        pathname: '/page',
        hash: '#section1',
        href: 'https://test.com/page#section1',
      });

      await pageViewReporter.ReportAsync(mockCookie);

      expect(mockAnalyticsClient.SendPageViewAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          path: '/page', // Hash should NOT be included
        })
      );
    });

    it('should handle multiple hash characters in URL', async () => {
      setupWindowLocation({
        hostname: 'test.com',
        pathname: '/page',
        hash: '#section#subsection',
        href: 'https://test.com/page#section#subsection',
      });

      await pageViewReporter.ReportAsync(mockCookie);

      expect(mockAnalyticsClient.SendPageViewAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          path: '/page', // Hash should NOT be included
        })
      );
    });

    it('should handle hash with query parameters', async () => {
      setupWindowLocation({
        hostname: 'test.com',
        pathname: '/page',
        search: '?param=value',
        hash: '#section',
        href: 'https://test.com/page?param=value#section',
      });

      await pageViewReporter.ReportAsync(mockCookie);

      expect(mockAnalyticsClient.SendPageViewAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          path: '/page', // Hash should NOT be included
          otherParameters: {
            param: 'value',
          },
        })
      );
    });

    it('should handle empty hash fragment', async () => {
      setupWindowLocation({
        hostname: 'test.com',
        pathname: '/page',
        hash: '',
        href: 'https://test.com/page#',
      });

      await pageViewReporter.ReportAsync(mockCookie);

      expect(mockAnalyticsClient.SendPageViewAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          path: '/page',
        })
      );
    });

    it('should handle hash with special characters', async () => {
      setupWindowLocation({
        hostname: 'test.com',
        pathname: '/page',
        hash: '#section-with-special-chars!@#$%^&*()',
        href: 'https://test.com/page#section-with-special-chars!@#$%^&*()',
      });

      await pageViewReporter.ReportAsync(mockCookie);

      expect(mockAnalyticsClient.SendPageViewAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          path: '/page', // Hash should NOT be included
        })
      );
    });

    it('should handle hash with encoded characters', async () => {
      setupWindowLocation({
        hostname: 'test.com',
        pathname: '/page',
        hash: '#section%20with%20spaces',
        href: 'https://test.com/page#section%20with%20spaces',
      });

      await pageViewReporter.ReportAsync(mockCookie);

      expect(mockAnalyticsClient.SendPageViewAsync).toHaveBeenCalledWith(
        expect.objectContaining({
          path: '/page', // Hash should NOT be included
        })
      );
    });

    it('should demonstrate current behavior limitation - hash is lost', async () => {
      // This test documents the current behavior where hash fragments are lost
      // This might be a limitation depending on business requirements
      setupWindowLocation({
        hostname: 'test.com',
        pathname: '/page',
        hash: '#important-section',
        href: 'https://test.com/page#important-section',
      });

      await pageViewReporter.ReportAsync(mockCookie);

      const sentPageView = (mockAnalyticsClient.SendPageViewAsync as jest.Mock).mock.calls[0][0];
      
      // Current implementation loses hash information
      expect(sentPageView.path).toBe('/page');
      expect(sentPageView.path).not.toContain('#important-section');
      
      // This demonstrates that if hash information is needed for analytics,
      // the implementation would need to be modified to include it
    });
  });

  describe('GetFunnelStep', () => {
    it('should return 1 for donate-now path', () => {
      setupWindowLocation({
        pathname: '/donate-now',
      });

      const result = pageViewReporter.GetFunnelStep();
      expect(result).toBe(1);
    });

    it('should return 1 for path containing donate-now', () => {
      setupWindowLocation({
        pathname: '/some/path/donate-now/page',
      });

      const result = pageViewReporter.GetFunnelStep();
      expect(result).toBe(1);
    });

    it('should return 0 for paths not containing donate-now', () => {
      setupWindowLocation({
        pathname: '/home',
      });

      const result = pageViewReporter.GetFunnelStep();
      expect(result).toBe(0);
    });

    it('should return 0 for empty path', () => {
      setupWindowLocation({
        pathname: '',
      });

      const result = pageViewReporter.GetFunnelStep();
      expect(result).toBe(0);
    });
  });

  describe('ParseQueryString', () => {
    it('should parse UTM parameters correctly', () => {
      setupWindowLocation({
        search: '?utm_source=google&utm_medium=cpc&utm_campaign=test',
      });

      const result = pageViewReporter.ParseQueryString();

      expect(result.utmParameters).toEqual({
        utm_source: 'google',
        utm_medium: 'cpc',
        utm_campaign: 'test',
      });
      expect(result.otherParameters).toEqual({});
    });

    it('should parse non-UTM parameters correctly', () => {
      setupWindowLocation({
        search: '?param1=value1&param2=value2',
      });

      const result = pageViewReporter.ParseQueryString();

      expect(result.utmParameters).toEqual({});
      expect(result.otherParameters).toEqual({
        param1: 'value1',
        param2: 'value2',
      });
    });

    it('should handle mixed UTM and non-UTM parameters', () => {
      setupWindowLocation({
        search: '?utm_source=google&other_param=value&utm_campaign=test',
      });

      const result = pageViewReporter.ParseQueryString();

      expect(result.utmParameters).toEqual({
        utm_source: 'google',
        utm_campaign: 'test',
      });
      expect(result.otherParameters).toEqual({
        other_param: 'value',
      });
    });

    it('should handle empty query string', () => {
      setupWindowLocation({
        search: '',
      });

      const result = pageViewReporter.ParseQueryString();

      expect(result.utmParameters).toEqual({});
      expect(result.otherParameters).toEqual({});
    });

    it('should handle query string with no parameters', () => {
      setupWindowLocation({
        search: '?',
      });

      const result = pageViewReporter.ParseQueryString();

      expect(result.utmParameters).toEqual({});
      expect(result.otherParameters).toEqual({});
    });

    it('should handle URL encoded parameters', () => {
      setupWindowLocation({
        search: '?utm_source=google%20ads&param=value%20with%20spaces',
      });

      const result = pageViewReporter.ParseQueryString();

      expect(result.utmParameters).toEqual({
        utm_source: 'google ads',
      });
      expect(result.otherParameters).toEqual({
        param: 'value with spaces',
      });
    });
  });
});
