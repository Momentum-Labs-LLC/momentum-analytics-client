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
        if((cookie.PiiBitmap & this.type) == 0) {
            var piiValue = await this.GetPiiValueAsync();
            if(piiValue && this.pattern.test(piiValue)) {
                await this.analyticsClient.SendPiiAsync({value: piiValue, type: this.type });
            } // end if
        } // end if
    } // end method

    abstract GetPiiValueAsync() : Promise<string | null>;
} // end method
