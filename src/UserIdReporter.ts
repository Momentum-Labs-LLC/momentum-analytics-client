import { IAnalyticsApiClient } from "./AnalyticsApiClient";
import { IAnalyticsCookie } from "./AnalyticsCookieProvider";
import { IPiiReporter, PiiReporterBase } from "./PiiReporter";

interface IUserIdReporter extends IPiiReporter {
}

type JwtToken = { [key: string] : string };

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
        var result = false;
        if(piiValue && piiValue != cookie.UserId) {
            result = true;
        } // end if

        return result;
    } // end method

    async GetPiiValueAsync(): Promise<string | null> {
        var result = null;

        var searchParams = new URLSearchParams(window.location.search);
        return searchParams.get("userId");

        if(this.IsUserAuthenticated()) {
            if(window.dataLayer) {

            } else if(window.adobeDataLayer) {

            }
            // https://www.oneblood.org/content/oneblood/us/en/jcr:content.invita.json?type=GET_USER
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