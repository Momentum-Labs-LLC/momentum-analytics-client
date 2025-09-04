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

    // Override of PiiReporterBase.ShouldGetValueAsync
    // Always attempt to get the user id.
    async ShouldGetValueAsync(cookie: IAnalyticsCookie): Promise<boolean> {
        return true;
    } // end method

    // Overrid of PiiReporterBase.ShouldReportValueAsync
    // Only send the user if it isn't the last user id captured for this cookie.
    async ShouldReportValueAsync(cookie: IAnalyticsCookie, piiValue: string | null): Promise<boolean> {
        // Call the base class method first
        var baseResult = await super.ShouldReportValueAsync(cookie, piiValue);
        
        var result = false;
        if(baseResult && piiValue && piiValue != cookie.UserId) {
            result = true;
        } // end if

        return result;
    } // end method

    async GetPiiValueAsync(): Promise<string | null> {
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

    IsUserAuthenticated() : boolean {
        var result = false;
        
        var authenticatedElements = document.getElementsByClassName("authenticated");

        if(authenticatedElements.length > 0) {
            result = true;
        } // end if

        return result;
    } // end method
} // end class