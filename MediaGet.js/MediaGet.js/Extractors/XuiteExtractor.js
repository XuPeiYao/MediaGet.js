var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var MediaGet;
(function (MediaGet) {
    var Extractors;
    (function (Extractors) {
        "use strict";
        /*
         * 針對Xuite的剖析器
         */
        class XuiteExtractor extends MediaGet.ExtractorBase {
            getMediaInfosAsync(url) {
                return __awaiter(this, void 0, Promise, function* () {
                    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                        if (!this.isMatch(url))
                            throw new MediaGet.UrlFormatException();
                        var mediaId = this.getMediaId(url);
                        var apiData = yield this.getMediaApiData(mediaId);
                        var result = new Array();
                        var baseInfo = new MediaGet.MediaInfo();
                        baseInfo.sourceUrl = url;
                        baseInfo.name = apiData.title;
                        baseInfo.duration = parseFloat(apiData.duration);
                        baseInfo.description = apiData.description;
                        baseInfo.thumbnail = apiData.thumb;
                        baseInfo.extractorType = XuiteExtractor;
                        baseInfo.type = apiData.type == 'video' ? MediaGet.MediaTypes.Video : MediaGet.MediaTypes.Audio;
                        baseInfo.attributes.author = apiData.author_name;
                        if (apiData.src) {
                            var def_src = baseInfo.clone();
                            def_src.realUrl = apiData.src;
                            if (baseInfo.type == MediaGet.MediaTypes.Video) {
                                def_src.attributes.size = '480x360';
                                def_src.attributes.quality = 'default';
                                def_src.attributes.mime = 'video/mp4';
                            }
                            else if (baseInfo.type == MediaGet.MediaTypes.Audio) {
                                def_src.attributes.mime = 'audio/mp3';
                            }
                            result.push(def_src);
                        }
                        if (apiData.flv_src) {
                            var flv_src = baseInfo.clone();
                            flv_src.realUrl = apiData.flv_src;
                            if (baseInfo.type == MediaGet.MediaTypes.Video) {
                                flv_src.attributes.size = '480x360';
                                flv_src.attributes.quality = 'default';
                                flv_src.attributes.mime = 'video/x-flv';
                            }
                            else {
                                flv_src.attributes.mime = 'audio/x-flv';
                            }
                            result.push(flv_src);
                        }
                        if (apiData.hq_src) {
                            var hq_src = baseInfo.clone();
                            hq_src.realUrl = apiData.hq_src;
                            if (baseInfo.type == MediaGet.MediaTypes.Video) {
                                hq_src.attributes.size = '1280x720';
                                hq_src.attributes.quality = 'hq';
                            }
                            hq_src.attributes.mime = 'video/mp4';
                            result.push(hq_src);
                        }
                        if (apiData.hd1080_src) {
                            var hd1080_src = baseInfo.clone();
                            hd1080_src.realUrl = apiData.hd1080_src;
                            if (baseInfo.type == MediaGet.MediaTypes.Video) {
                                hd1080_src.attributes.size = '1920x1080';
                                hd1080_src.attributes.quality = 'hd';
                            }
                            hd1080_src.attributes.mime = 'video/mp4';
                            result.push(hd1080_src);
                        }
                        return result;
                    }));
                });
            }
            getMediaApiData(mediaId) {
                return __awaiter(this, void 0, Promise, function* () {
                    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                        var apiData = yield this.downloadHtmlDocumentAsync(MediaGet.MethodTypes.GET, `http://vlog.xuite.net/flash/player?media=${mediaId}`);
                        var propertys = apiData.getElementsByTagName('property');
                        var result = {};
                        for (var i = 0; i < propertys.length; i++) {
                            var key = atob(propertys[i].getAttribute('id'));
                            var value = atob(propertys[i].textContent);
                            if (!value || value.length)
                                result[key] = decodeURIComponent(value);
                        }
                        return result;
                    }));
                });
            }
            getMediaId(url) {
                return btoa(atob(url.split('/').last().innerString('-', '.')));
            }
        }
        Extractors.XuiteExtractor = XuiteExtractor;
    })(Extractors = MediaGet.Extractors || (MediaGet.Extractors = {}));
})(MediaGet || (MediaGet = {}));
//# sourceMappingURL=XuiteExtractor.js.map