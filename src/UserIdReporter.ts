import { IPiiReporter, PiiReporterBase } from "./PiiReporter";

interface IUserIdReporter extends IPiiReporter {
}

type JwtToken = { [key: string] : string };

export class UserIdReporter extends PiiReporterBase implements IUserIdReporter {
    type = 1;
    pattern = new RegExp("^\\d*$");

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