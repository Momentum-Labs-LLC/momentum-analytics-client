import { IAnalyticsApiClient } from "./AnalyticsApiClient";
import { IAnalyticsCookie } from "./AnalyticsCookieProvider";
import { IPageViewReporter } from "./PageViewReporter";

export class PageViewV2Reporter implements IPageViewReporter {
    analyticsClient : IAnalyticsApiClient

    constructor(analyticsClient : IAnalyticsApiClient) {
        this.analyticsClient = analyticsClient;
    } // end method

    async ReportAsync(cookie: IAnalyticsCookie): Promise<void> {
        // report all pages
        var pageView : IPageViewV2 = {
            referer : document.referrer,
            url: window.location.href,        
        };

        await this.analyticsClient.SendPageViewV2Async(pageView);       
    } // end method
} // end class