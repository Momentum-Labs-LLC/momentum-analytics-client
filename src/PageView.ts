interface IPageView {
    referer : string | null,
    utmParameters? : Record<string, string>, // Dictionary<string, string>
    domain : string,
    path : string,
    funnelStep : number
}