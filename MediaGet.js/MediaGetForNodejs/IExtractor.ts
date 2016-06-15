module MediaGet {
    export interface IExtractor {
        getMediaInfosAsync(url: string): Promise<MediaInfo[]>;
        isMatch(url: string): boolean;
    }
}