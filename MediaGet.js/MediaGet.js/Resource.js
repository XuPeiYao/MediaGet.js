var Extractors = MediaGet.Extractors;
var MediaGet;
(function (MediaGet) {
    MediaGet.matchRegex = {
        [MediaGet.Extractors.YoutubeExtractor.constructor]: /http(s)?:\/\/www.youtube.com\/watch\?v=.+/
    };
})(MediaGet || (MediaGet = {}));
//# sourceMappingURL=Resource.js.map