import { AnalyticsCookieProvider } from "./AnalyticsCookieProvider";
import { IAnalyticsApiClientConfiguration } from "./AnalyticsApiClientConfiguration";
import { AnalyticsApiClientFactory } from "./AnalyticsApiClientFactory";
import { PageViewReporter } from "./PageViewReporter";
import { UserIdReporter } from "./UserIdReporter";
import { FormEmailReporter } from "./EmailReporter";
import { UrlEmailReporter } from "./EmailReporter";

document.addEventListener('DOMContentLoaded', async function() {
    var cookieProvider = new AnalyticsCookieProvider();
    var analyticsCookie = await cookieProvider.GetAsync();

    var apiClientConfig : IAnalyticsApiClientConfiguration = {
        baseUrl: "https://api.mll-analytics.com",
        //baseUrl: "https://localhost:4000/",
        pageViewsPath: "v1/page-views",
        piiPath: "v1/pii"
    };

    var clientFactory = new AnalyticsApiClientFactory(apiClientConfig);
    var apiClient = await clientFactory.BuildAsync();
    
    var pageViewReporter = new PageViewReporter(apiClient);
    // do this now to make sure i have a cookie for other hits
    await pageViewReporter.ReportAsync(analyticsCookie);

    var userIdReporter = new UserIdReporter(apiClient);
    var inputEmailReporter = new FormEmailReporter(apiClient);
    var verifyEmailReporter = new UrlEmailReporter(apiClient); 

    await Promise.all([
        userIdReporter.ReportAsync(analyticsCookie),
        inputEmailReporter.ReportAsync(analyticsCookie),
        verifyEmailReporter.ReportAsync(analyticsCookie)
    ]);
}); // end method