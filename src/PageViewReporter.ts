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
        var funnelStep = this.GetFunnelStep();
        var { utmParameters, otherParameters } = this.ParseQueryString();

        // report all pages
        var pageView : IPageView = {
            referer : document.referrer,
            utmParameters : utmParameters,
            domain: window.location.hostname,
            path: window.location.pathname,
            otherParameters : otherParameters,
            funnelStep : funnelStep,            
        };

        await this.analyticsClient.SendPageViewAsync(pageView);       
    } // end method

    GetFunnelStep() : number {
        var result = 0;

        if(window.location.pathname.indexOf("donate-now") > -1) {
            result = 1;
        } // end if

        return result;
    } // end method

    ParseQueryString() : { utmParameters: Record<string, string>, otherParameters: Record<string, string> } {
        const result = {
            utmParameters: {} as Record<string, string>,
            otherParameters: {} as Record<string, string>
        }

        if(window.location.search) { 
            var searchParams = new URLSearchParams(window.location.search);

            searchParams.forEach(function(value: string, key: string, parent: URLSearchParams) {
                if(key.indexOf("utm") > -1) {
                    result.utmParameters[key] = value;
                } else {
                    result.otherParameters[key] = value;
                } // end if
            });
        } // end if

        return result;
    } // end method
} // end class