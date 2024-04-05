import { IAnalyticsApiClient } from "./AnalyticsApiClient";
import { IAnalyticsCookie } from "./AnalyticsCookieProvider";

interface IPageViewReporter {
    ReportAsync(cookie: IAnalyticsCookie) : Promise<void>;
} // end interface

export class PageViewReporter implements IPageViewReporter {
    analyticsClient : IAnalyticsApiClient

    constructor(analyticsClient : IAnalyticsApiClient) {
        this.analyticsClient = analyticsClient;
    } // end method

    async ReportAsync(cookie: IAnalyticsCookie): Promise<void> {
        var msSinceEpoch = Date.now();
        var funnelStep = await this.GetFunnelStepAsync();

        if(msSinceEpoch >= cookie.VisitExpiration || funnelStep > cookie.MaxFunnelStep) {
            // this is a new visit or this page is deeper in the funnel than has previously been reported
            var pageView : IPageView = {
                referer : await this.GetReferrerAsync(),
                utmParameters : await this.GetUtmParametersAsync(),
                domain: window.location.hostname,
                path: window.location.pathname,
                funnelStep : funnelStep
            };

            await this.analyticsClient.SendPageViewAsync(pageView);
        } // end if        
    } // end method

    async GetFunnelStepAsync() : Promise<number> {
        var result = 0;

        if(window.location.pathname.indexOf("donate-now") > -1) {
            result = 1;
        } // end if

        return result;
    } // end method

    async GetReferrerAsync() : Promise<string|null> {
        var result = null;

        var referrer = document.referrer;
        if(referrer && referrer.indexOf(window.location.hostname) === -1) {
            result = new URL(referrer).host;
        } // end if

        return result;
    } // end method

    async GetUtmParametersAsync() : Promise<Record<string, string>> {
        var result : Record<string, string> = {};

        var searchParams = new URLSearchParams(window.location.search);

        searchParams.forEach(function(value: string, key: string, parent: URLSearchParams) {
            if(key.indexOf("utm") > -1) {
                result[key] = value;
            } // end if
        });

        return result;
    } // end method
} // end class