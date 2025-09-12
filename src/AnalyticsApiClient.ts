import { IAnalyticsApiClientConfiguration } from "./AnalyticsApiClientConfiguration";

export interface IAnalyticsApiClient {
    SendPageViewAsync(pageView: IPageView) : Promise<void>
    SendPageViewV2Async(pageView: IPageViewV2) : Promise<void>
    SendPiiAsync(pii: IPii) : Promise<void>
}

export abstract class AnalyticsApiClientBase implements IAnalyticsApiClient {
    apiConfiguration : IAnalyticsApiClientConfiguration;

    constructor(apiConfiguration : IAnalyticsApiClientConfiguration) {
        this.apiConfiguration = apiConfiguration
    }

    async SendPageViewAsync(pageView: IPageView): Promise<void> {
        await this.SendDataAsync(this.apiConfiguration.baseUrl + this.apiConfiguration.pageViewsPath, pageView);
    } // end method
    async SendPageViewV2Async(pageView: IPageViewV2): Promise<void> {
        await this.SendDataAsync(this.apiConfiguration.baseUrl + this.apiConfiguration.pageViewsPath, pageView);
    } // end method
    async SendPiiAsync(pii: IPii): Promise<void> {
        await this.SendDataAsync(this.apiConfiguration.baseUrl + this.apiConfiguration.piiPath, pii);
    } // end method

    abstract SendDataAsync(url : string, data : object) : Promise<void>;
} // end class