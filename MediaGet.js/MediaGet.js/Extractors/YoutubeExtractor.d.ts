declare module MediaGet.Extractors {
    class YoutubeExtractor extends ExtractorBase {
        getMediaInfosAsync(url: string): Promise<MediaInfo[]>;
        private getMediaJObject(htmlDoc);
        private getDecodingFunction(url);
        private getStreamFormatList(mediaJSON);
        private getStreamMap(mediaJSON);
        private convertMediaTypes(mime);
    }
}
