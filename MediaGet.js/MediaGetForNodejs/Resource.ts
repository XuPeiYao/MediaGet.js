import Extractors = MediaGet.Extractors;
module MediaGet {
    export var matchRegex = {
        [<any>Extractors.YoutubeExtractor]: /http(s)?:\/\/www.youtube.com\/watch\?v=.+/,
        [<any>Extractors.XuiteExtractor]: /http(s)?:\/\/vlog.xuite.net\/play\/.+/,
    };

}
exports.MediaGet = MediaGet;