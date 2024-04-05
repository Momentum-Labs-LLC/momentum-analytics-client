import { AnalyticsApiClientBase } from "./AnalyticsApiClient";

export class XmlHttpAnalyticsApiClient extends AnalyticsApiClientBase {
    async SendDataAsync(url: string, data: object): Promise<void> {
        var httpRequest = new XMLHttpRequest();

        httpRequest.withCredentials = true;        
        httpRequest.onerror = (event: ProgressEvent) => {
            console.log(httpRequest.statusText);
        };
        httpRequest.open("POST", url, true);
        httpRequest.setRequestHeader('Content-Type', 'application/json');
        httpRequest.send(JSON.stringify(data));
    } // end method
} // end class