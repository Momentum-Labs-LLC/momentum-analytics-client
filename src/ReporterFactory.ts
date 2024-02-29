interface IPageView {

}

interface IPageViewFactory {
    Build() : IPageView
}



interface IReporter {
    SendPageViewAsync(pageView: IPageView) : Promise<void>
}

interface IReporterFactory {
    Build() : IReporter
}

class ReporterFactory implements IReporterFactory {
    Build(): IReporter {
        var result: IReporter;
        
        if(typeof fetch !== undefined) {
            result = new FetchReporter();
        } else if (typeof XMLHttpRequest !== undefined) {
            result = new XmlHttpReporter();
        } else {
            result = new PixelReporter();
        } // end if

        return result;
    } // end method
} // end class
    
class FetchReporter implements IReporter {
    SendPageViewAsync(pageView: IPageView): Promise<void> {
        throw new Error("Method not implemented.")
    }
}

class XmlHttpReporter implements IReporter {
    SendPageViewAsync(pageView: IPageView): Promise<void> {
        throw new Error("Method not implemented.")
    } 
}

class PixelReporter implements IReporter {
    SendPageViewAsync(pageView: IPageView): Promise<void> {
        throw new Error("Method not implemented.")
    }
}