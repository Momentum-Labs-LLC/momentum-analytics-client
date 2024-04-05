import { IAnalyticsApiClientConfiguration } from "./AnalyticsApiClientConfiguration";
import { IAnalyticsApiClient } from "./AnalyticsApiClient";
import { FetchAnalyticsApiClient } from "./FetchAnalyticsApiClient";
import { XmlHttpAnalyticsApiClient } from "./XmlHttpAnalyticsApiClient";
import { PixelAnalyticsApiClient } from "./PixelAnalyticsApiClient";

require("./FetchAnalyticsApiClient");
require("./PixelAnalyticsApiClient");
require("./XmlHttpAnalyticsApiClient");

export interface IAnalyticsApiClientFactory {
    BuildAsync() : Promise<IAnalyticsApiClient>
} // end interface

export class AnalyticsApiClientFactory implements IAnalyticsApiClientFactory {
    apiConfiguration : IAnalyticsApiClientConfiguration;
    
    constructor(apiConfiguration: IAnalyticsApiClientConfiguration) {
        this.apiConfiguration = apiConfiguration;
    }

    async BuildAsync(): Promise<IAnalyticsApiClient> {
        var result: IAnalyticsApiClient;
        
        if(typeof fetch !== undefined) {
            result = new FetchAnalyticsApiClient(this.apiConfiguration);
        } else if (typeof XMLHttpRequest !== undefined) {
            result = new XmlHttpAnalyticsApiClient(this.apiConfiguration);
        } else {
            result = new PixelAnalyticsApiClient(this.apiConfiguration);
        } // end if

        return result;
    } // end method
} // end class