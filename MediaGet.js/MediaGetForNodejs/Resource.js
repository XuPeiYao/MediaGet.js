var Extractors = MediaGet.Extractors;
var MediaGet;
(function (MediaGet) {
    MediaGet.matchRegex = (_a = {},
        _a[MediaGet.Extractors.YoutubeExtractor] = /http(s)?:\/\/www.youtube.com\/watch\?v=.+/,
        _a[MediaGet.Extractors.XuiteExtractor] = /http(s)?:\/\/vlog.xuite.net\/play\/.+/,
        _a
    );
    var _a;
})(MediaGet || (MediaGet = {}));
exports.MediaGet = MediaGet;
//# sourceMappingURL=Resource.js.map