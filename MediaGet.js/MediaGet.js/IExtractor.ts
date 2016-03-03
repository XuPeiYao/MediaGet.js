module MediaGet {
    export interface IExtractor {
        getMediaInfosAsync(url: string | URL): Promise<MediaInfo[]>;
        isMatch(url: string | URL): boolean;
    }
}