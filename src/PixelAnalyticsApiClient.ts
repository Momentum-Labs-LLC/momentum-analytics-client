import { AnalyticsApiClientBase } from "./AnalyticsApiClient";

export class PixelAnalyticsApiClient extends AnalyticsApiClientBase {
    async SendDataAsync(url: string, data: object): Promise<void> {
        var json = JSON.stringify(data);
        var base64EncodedJson = window.btoa(json);

        const myImage = new Image(1, 1);
        myImage.src = url+ "/1x1.gif" + "?e=" + base64EncodedJson;

        document.body.appendChild(myImage);
    } // end method
} // end class