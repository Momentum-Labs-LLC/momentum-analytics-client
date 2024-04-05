import { IAnalyticsCookie } from "./AnalyticsCookieProvider";
import { IPiiReporter, PiiReporterBase } from "./PiiReporter";

interface IEmailReporter extends IPiiReporter { 
}

abstract class EmailReporterBase extends PiiReporterBase implements IEmailReporter {
    type = 2;
    pattern = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
} // end class

interface IFormEmailReporter extends IEmailReporter { } // end interface

export class FormEmailReporter extends EmailReporterBase implements IFormEmailReporter{

    private capturedEmails: string[] = [];

    GetPiiValueAsync(): Promise<string | null> {
        throw new Error("Method not implemented.");
    }

    async ReportAsync(cookie: IAnalyticsCookie): Promise<void> {
        if((cookie.PiiBitmap & this.type) == 0) {
            var emailInputs = document.querySelectorAll<HTMLInputElement>('input[type=email]');

            if(emailInputs.length > 0) {
                emailInputs.forEach(emailInput => {
                    emailInput.addEventListener("blur", async (ev) => await this.HandleBlurEvent(emailInput, ev));
                }) // end foreach
            } // end if
        } // end if
    } // end method

    async HandleBlurEvent(inputElement: HTMLInputElement, ev: FocusEvent) : Promise<void> {
        if(inputElement.value 
            && this.pattern.test(inputElement.value)
            && this.capturedEmails.indexOf(inputElement.value) === -1) {
            
            // save this particular value as a captured value
            this.capturedEmails.push(inputElement.value);

            // send the pii value
            await this.analyticsClient.SendPiiAsync({value: inputElement.value, type: this.type });
        } // end if
    } // end method
} // end class

interface IUrlEmailReporter extends IEmailReporter {} // end interface

export class UrlEmailReporter extends EmailReporterBase implements IUrlEmailReporter {
    async GetPiiValueAsync(): Promise<string | null> {
        var searchParams = new URLSearchParams(window.location.search);
        var usernameValue = searchParams.get("username");

        return usernameValue;
    } // end class
} // end class