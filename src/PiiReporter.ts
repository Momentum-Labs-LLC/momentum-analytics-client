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
        var shouldGetValue = this.ShouldGetValue(cookie);
        if(shouldGetValue) {
            var piiValue = this.GetPiiValue();
            if(piiValue) {
                var shouldReport = this.ShouldReportValue(cookie, piiValue);
                if(shouldReport) {
                    await this.analyticsClient.SendPiiAsync({value: piiValue, type: this.type });
                } // end if
            } // end if
        } // end if
    } // end method

    ShouldGetValue(cookie: IAnalyticsCookie) : boolean {
        var result = false;
        
        if((cookie.PiiBitmap & this.type) == 0) {
            result = true;
        } // end if

        return result;
    } // end method

    ShouldReportValue(cookie: IAnalyticsCookie, piiValue: string | null) : boolean {
        var result = false;        
        
        if(piiValue && this.pattern.test(piiValue)) {
            result = true;
        } // end if

        return result;
    } // end method

    abstract GetPiiValue() : string | null;
} // end method
