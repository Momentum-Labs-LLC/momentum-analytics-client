import { AnalyticsApiClientBase } from "./AnalyticsApiClient";

export class FetchAnalyticsApiClient extends AnalyticsApiClientBase {
    async SendDataAsync(url: string, data: object): Promise<void> {
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(data),
            mode: "cors"
        })
        .catch(error => console.log(error));
    } // end method    
} // end class