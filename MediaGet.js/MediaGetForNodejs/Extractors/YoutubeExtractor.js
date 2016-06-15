var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
         * 針對Youtube的剖析器
         */
        var YoutubeExtractor = (function (_super) {
            __extends(YoutubeExtractor, _super);
            function YoutubeExtractor() {
                _super.apply(this, arguments);
            }
            YoutubeExtractor.prototype.getMediaInfosAsync = function (url) {
                return __awaiter(this, void 0, Promise, function* () {
                    var _this = this;
                    if (!this.isMatch(url))
                        throw new MediaGet.UrlFormatException();
                    var youtubePage = yield this.downloadHtmlDocumentAsync(MediaGet.MethodTypes.GET, url, null);
                    var mediaJSON = this.getMediaJObject(youtubePage);
                    if (mediaJSON['args']['livestream'] == '1')
                        throw new MediaGet.NotSupportException();
                    var description = this.toArray(youtubePage.getElementsByTagName('meta')).filter(function (x) { return x && x.getAttribute && x.getAttribute('name') == 'description'; })[0].getAttribute('content');
                    var decodingFunction = yield this.getDecodingFunction("https:" + mediaJSON['assets']['js']);
                    var streamFormatList = this.getStreamFormatList(mediaJSON);
                    var streamMap = this.getStreamMap(mediaJSON);
                    var result = new Array();
                    streamMap.forEach(function (item) {
                        var resultItem = new MediaGet.MediaInfo();
                        //#region 通用屬性
                        resultItem.sourceUrl = url;
                        resultItem.extractorType = YoutubeExtractor;
                        resultItem.name = mediaJSON['args']['title'];
                        resultItem.duration = mediaJSON['args']['length_seconds'];
                        resultItem.description = description;
                        resultItem.thumbnail = mediaJSON['args']['thumbnail_url'];
                        resultItem.type = _this.convertMediaTypes(item['type']['mime']);
                        //#endregion
                        //#region 連結解密
                        var realUrlBuilder = MediaGet.UrlQueryStringBuilder.parse(item['url']);
                        var urlSignature = realUrlBuilder.query['s'] || realUrlBuilder.query['sig'] || realUrlBuilder.query['signature'];
                        var itemSignature = item['s'] || item['sig'] || item['signature'];
                        realUrlBuilder.query['signature'] = decodingFunction(urlSignature || itemSignature, urlSignature != null);
                        resultItem.realUrl = realUrlBuilder.toString();
                        //#endregion
                        //#region 擴充屬性
                        resultItem.attributes['mime'] = item['type']['mime'];
                        resultItem.attributes['codecs'] = item['type']['codecs'];
                        resultItem.attributes['author'] = mediaJSON['args']['author'];
                        if (resultItem.type == MediaGet.MediaTypes.Video) {
                            resultItem.attributes['size'] = item['size'] || streamFormatList[item['itag']];
                            resultItem.attributes['quality'] = item['quality'];
                        }
                        else if (resultItem.type == MediaGet.MediaTypes.Audio) {
                            resultItem.attributes['bitrate'] = item['bitrate'];
                        }
                        //#endregion
                        result.push(resultItem);
                    });
                    return result;
                });
            };
            YoutubeExtractor.prototype.toArray = function (obj) {
                var result = [];
                for (var key in obj)
                    result.push(obj[key]);
                return result;
            };
            YoutubeExtractor.prototype.getMediaJObject = function (htmlDoc) {
                var script = this.toArray(htmlDoc.getElementsByTagName("script"));
                script = script.filter(function (item) { return item && item.textContent && item.textContent.indexOf("var ytplayer") > -1; })[0].textContent;
                return this.safeEval(script + ";return ytplayer.config;");
            };
            YoutubeExtractor.prototype.getDecodingFunction = function (url) {
                return __awaiter(this, void 0, Promise, function* () {
                    var _this = this;
                    var playerScript = yield this.downloadStringAsync(MediaGet.MethodTypes.GET, url);
                    var functionName = playerScript.innerString('"signature",', "(");
                    if (functionName == null || functionName.length == 0)
                        return function (value, inUrl) { return value; };
                    var functionBody = "function" + playerScript.innerString("," + functionName + "=function", '}') + ";}";
                    var functionRefName = functionBody.innerString(";\n", ".");
                    var functionRef = playerScript.innerString("var " + functionRefName + "=", ";var");
                    var args = functionBody.innerString("(", ")");
                    functionBody = functionBody.substring(functionBody.indexOf("{") + 1);
                    functionBody = "function(" + args + "){var " + functionRefName + "=" + functionRef + ";" + functionBody;
                    return function (value, inUrl) {
                        var scriptResult = _this.safeEval("return (" + functionBody + ")('" + value + "');");
                        var result = value;
                        if (inUrl) {
                            if (value.length != 81 && scriptResult.length == 81)
                                result = scriptResult;
                        }
                        else {
                            result = scriptResult;
                        }
                        return result;
                    };
                });
            };
            YoutubeExtractor.prototype.getStreamFormatList = function (mediaJSON) {
                var result = {};
                mediaJSON['args']['fmt_list'].split(',').map(function (item) { return item.split('/'); }).forEach(function (item) {
                    result[item[0]] = item[1];
                });
                ;
                return result;
            };
            YoutubeExtractor.prototype.getStreamMap = function (mediaJSON) {
                function getStreamMapByKey(_mediaJSON_, key) {
                    if (!_mediaJSON_['args'][key])
                        return null;
                    var result = _mediaJSON_['args'][key].split(',')
                        .map(function (item) { return item.split('&'); })
                        .map(function (item) {
                        var temp = {};
                        item.forEach(function (item2) {
                            var keyValue = item2.splitCount('=', 2);
                            temp[keyValue[0]] = decodeURIComponent(keyValue[1]);
                        });
                        return temp;
                    });
                    result.forEach(function (item) {
                        var hasCodecs = item['type'].indexOf(';');
                        var typeJSON = {};
                        typeJSON['mime'] = item['type'].substring(0, hasCodecs == -1 ? item['type'].length : hasCodecs);
                        if (hasCodecs > -1) {
                            var temp = item['type'].innerString('"', '"');
                            if (temp)
                                temp.replace(/\+/g, "");
                            typeJSON['codecs'] = temp;
                        }
                        item['type'] = typeJSON;
                    });
                    return result;
                }
                return getStreamMapByKey(mediaJSON, 'url_encoded_fmt_stream_map').concat(getStreamMapByKey(mediaJSON, 'adaptive_fmts') || []);
            };
            YoutubeExtractor.prototype.convertMediaTypes = function (mime) {
                mime = mime.split('/')[0];
                if (mime == 'video')
                    return MediaGet.MediaTypes.Video;
                return MediaGet.MediaTypes.Audio;
            };
            return YoutubeExtractor;
        }(MediaGet.ExtractorBase));
        Extractors.YoutubeExtractor = YoutubeExtractor;
    })(Extractors = MediaGet.Extractors || (MediaGet.Extractors = {}));
})(MediaGet || (MediaGet = {}));
//# sourceMappingURL=YoutubeExtractor.js.map