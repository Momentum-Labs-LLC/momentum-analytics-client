import { IAnalyticsApiClient } from "./AnalyticsApiClient";
import { IAnalyticsCookie } from "./AnalyticsCookieProvider";

export interface IPiiReporter {
    ReportAsync(cookie: IAnalyticsCookie) : Promise<void>;
} // end interface

export abstract class PiiReporterBase implements IPiiReporter {
    abstract type: number;
    abstract pattern: RegExp;

    analyticsClient : IAnalyticsApiClient

    constructor(analyticsClient : IAnalyticsApiClient) {
        this.analyticsClient = analyticsClient;
    }

    async ReportAsync(cookie: IAnalyticsCookie): Promise<void> {
        var shouldGetValue = await this.ShouldGetValueAsync(cookie);
        if(shouldGetValue) {
            var piiValue = await this.GetPiiValueAsync();
            if(piiValue) {
                var shouldReport = await this.ShouldReportValueAsync(cookie, piiValue);
                if(shouldReport) {
                    await this.analyticsClient.SendPiiAsync({value: piiValue, type: this.type });
                } // end if
            } // end if
        } // end if
    } // end method

    async ShouldGetValueAsync(cookie: IAnalyticsCookie) : Promise<boolean> {
        var result = false;
        
        if((cookie.PiiBitmap & this.type) == 0) {
            result = true;
        } // end if

        return result;
    } // end method

    async ShouldReportValueAsync(cookie: IAnalyticsCookie, piiValue: string | null) : Promise<boolean> {
        var result = false;        
        
        if(piiValue && this.pattern.test(piiValue)) {
            result = true;
        } // end if

        return result;
    } // end method

    abstract GetPiiValueAsync() : Promise<string | null>;
} // end method
