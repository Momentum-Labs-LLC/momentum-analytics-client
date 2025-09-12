import { IAnalyticsCookie } from "./AnalyticsCookieProvider";
import { IPiiReporter, PiiReporterBase } from "./PiiReporter";

interface IUserIdReporter extends IPiiReporter {
}

interface IUserIdData { 
    user_type: number;
    user_id: string;
}

export class UserIdReporter extends PiiReporterBase implements IUserIdReporter {
    type = 1;
    pattern = new RegExp("^\\d*$");
    checkIntervalMs = 300;
    checkInterval: NodeJS.Timeout | null = null;

    async AttemptReportAsync(cookie: IAnalyticsCookie) : Promise<void> {
        var piiValue = this.GetPiiValue();
        if(piiValue) {
            // Stop the interval so this method will not keep being called
            this.checkInterval = null;
            var shouldReport = this.ShouldReportValue(cookie, piiValue);
            if(shouldReport) {
                await this.analyticsClient.SendPiiAsync({value: piiValue, type: this.type });
            } // end if
        } // end if
    } // end method

    // Override of PiiReporterBase.ReportAsync
    async ReportAsync(cookie: IAnalyticsCookie): Promise<void> {
        // start the interval to attempt to report the user id
        this.checkInterval = setInterval(async () => await this.AttemptReportAsync(cookie), this.checkIntervalMs);
    } // end method

    // Overrid of PiiReporterBase.ShouldReportValueAsync
    // Only send the user if it isn't the last user id captured for this cookie.
    ShouldReportValue(cookie: IAnalyticsCookie, piiValue: string | null): boolean {
        // Call the base class method first
        var baseResult = super.ShouldReportValue(cookie, piiValue);
        
        var result = false;
        if(baseResult && piiValue && piiValue != cookie.UserId) {
            result = true;
        } // end if

        return result;
    } // end method

    GetPiiValue(): string | null {
        var result = null;

        var donorIdEvents = window.adobeDataLayer?.filter((item) => { 
                var result = false;

                if (item.event === "dddc") {
                    var userIdData = item.data as IUserIdData;
                    if(userIdData?.user_type === 1 && userIdData?.user_id) {
                        result = true;
                    } // end if
                } // end if
            })
            .map((dddcEvents => {
                return dddcEvents.data as IUserIdData;
            }));
        
        if (donorIdEvents && donorIdEvents.length > 0) {
            result = donorIdEvents[0].user_id;
        } // end if         

        return result;
    } // end method
} // end class