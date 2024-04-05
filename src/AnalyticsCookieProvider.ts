export interface IAnalyticsCookie {
    CookieId : string | null
    VisitExpiration : number
    PiiBitmap : number
    MaxFunnelStep: number
} // end interface

interface IAnalyticsCookieProvider { 
    GetAsync() : Promise<IAnalyticsCookie>
}

export class AnalyticsCookieProvider implements IAnalyticsCookieProvider {
    COOKIE_NAME = "mllc";
    COOKIE_ID = "id";
    VISIT_EXPIRATION = "vexp";
    PII_BITMAP = "pii";
    MAX_FUNNEL_STEP = "fs";

    async GetAsync(): Promise<IAnalyticsCookie> {
        var result : IAnalyticsCookie = { 
            CookieId : null,
            VisitExpiration : 0,
            PiiBitmap : 0,
            MaxFunnelStep : -1
        };

        var cookieValue = this.GetCookie(this.COOKIE_NAME);
        
        // deserialize the cookie
        if(cookieValue) {
            var cookieDict : { [key: string]: string } = {};
            cookieValue.split(',').forEach((piece) => {
                var kvpArray = piece.trim().split('=');
                if(kvpArray.length === 2) {
                    cookieDict[kvpArray[0]] = kvpArray[1];
                } // end if
            }); // end foreach
                
            result = {
                CookieId: cookieDict[this.COOKIE_ID],
                VisitExpiration : parseInt(cookieDict[this.VISIT_EXPIRATION]),
                PiiBitmap : parseInt(cookieDict[this.PII_BITMAP]),
                MaxFunnelStep: parseInt(cookieDict[this.MAX_FUNNEL_STEP])
            };
        } // end if

        return result;
    } // end method

    GetCookie(name: string) : string|null {
        var result = null;
        const nameLengthPlusOne = name.length + 1;
        var cookieValue = document.cookie
            .split(";")
            .map(cookie => cookie.trim())
            .filter(cookie => cookie.substring(0, nameLengthPlusOne) === `${name}=`)
            .map(cookie => decodeURI(cookie.substring(nameLengthPlusOne)))
            [0] || null;

        if(cookieValue) {
            result = decodeURIComponent(cookieValue)
        }

        return result;
    } // end method
} // end class