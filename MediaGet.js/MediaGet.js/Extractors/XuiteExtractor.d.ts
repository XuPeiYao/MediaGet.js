declare module MediaGet.Extractors {
    class XuiteExtractor extends ExtractorBase {
        getMediaInfosAsync(url: string): Promise<MediaInfo[]>;
        private getMediaApiData(mediaId);
        private getMediaId(url);
    }
}
