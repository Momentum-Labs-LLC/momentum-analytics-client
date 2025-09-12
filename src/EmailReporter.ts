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

    GetPiiValue(): string | null {
        throw new Error("Method not implemented.");
    }

    async ReportAsync(cookie: IAnalyticsCookie): Promise<void> {
        if((cookie.PiiBitmap & this.type) == 0) {
            var emailInputs = document.querySelectorAll<HTMLInputElement>('input[type=email]');

            if(emailInputs.length > 0) {
                emailInputs.forEach(emailInput => {
                    emailInput.addEventListener("blur", async (ev) => await this.HandleBlurEventAsync(emailInput, ev));
                }) // end foreach
            } // end if
        } // end if
    } // end method

    async HandleBlurEventAsync(inputElement: HTMLInputElement, ev: FocusEvent) : Promise<void> {
        if(inputElement.value 
            && this.pattern.test(inputElement.value) // test the value against the pattern
            && this.capturedEmails.indexOf(inputElement.value) === -1) { // check if the value has already been captured
            
            // save this particular value as a captured value
            this.capturedEmails.push(inputElement.value);

            // send the pii value
            await this.analyticsClient.SendPiiAsync({value: inputElement.value, type: this.type });
        } // end if
    } // end method
} // end class

interface IUrlEmailReporter extends IEmailReporter {} // end interface

export class UrlEmailReporter extends EmailReporterBase implements IUrlEmailReporter {
    GetPiiValue(): string | null {
        var searchParams = new URLSearchParams(window.location.search);
        var usernameValue = searchParams.get("username");

        return usernameValue;
    } // end class
} // end class