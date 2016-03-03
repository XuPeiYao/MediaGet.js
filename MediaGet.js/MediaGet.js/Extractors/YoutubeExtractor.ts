
module MediaGet.Extractors {
    
    
    export class YoutubeExtractor extends ExtractorBase{
        public async getMediaInfosAsync(url: string | URL): Promise<MediaInfo[]> {
            var youtubePage = await this.downloadHtmlDocumentAsync(MethodTypes.GET, url, null);
            var youtubePlayerConfig = youtubePage.querySelectorAll("script")
                .toArray().filter(item => !item.attributes["src"]);

        }
    }
}