var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MediaGet;
(function (MediaGet) {
    "use strict";
    var Exception = (function () {
        function Exception() {
        }
        return Exception;
    }());
    MediaGet.Exception = Exception;
    var NotSupportException = (function (_super) {
        __extends(NotSupportException, _super);
        function NotSupportException() {
            var _this = _super.call(this) || this;
            _this.name = "不支援項目";
            return _this;
        }
        return NotSupportException;
    }(Exception));
    MediaGet.NotSupportException = NotSupportException;
    var ArgumentsException = (function (_super) {
        __extends(ArgumentsException, _super);
        function ArgumentsException() {
            var _this = _super.call(this) || this;
            _this.name = "不正確的參數";
            return _this;
        }
        return ArgumentsException;
    }(Exception));
    MediaGet.ArgumentsException = ArgumentsException;
    var UrlFormatException = (function (_super) {
        __extends(UrlFormatException, _super);
        function UrlFormatException() {
            var _this = _super.call(this) || this;
            _this.name = "不正確的參數";
            _this.message = "不支援的目標連結";
            return _this;
        }
        return UrlFormatException;
    }(ArgumentsException));
    MediaGet.UrlFormatException = UrlFormatException;
})(MediaGet || (MediaGet = {}));
NodeList.prototype.toArray = function () {
    var result = new Array();
    for (var i = 0; i < this.length; i++)
        result.push(this[i]);
    return result;
};
Array.prototype.first = function () {
    return this[0];
};
Array.prototype.last = function () {
    return this[this.length - 1];
};
String.prototype.innerString = function (start, end) {
    var index = this.indexOf(start);
    if (index < 0)
        return null;
    var result = this.substring(index + start.length);
    index = result.indexOf(end);
    if (index < 0)
        return null;
    return result.substring(0, index);
};
String.prototype.splitCount = function (sig, count) {
    var result = new Array();
    var temp = this.split(sig);
    for (var i = 0; i < count - 1; i++) {
        result.push(temp.shift());
    }
    result.push(temp.join(sig));
    return result;
};
var MediaGet;
(function (MediaGet) {
    "use strict";
    var UrlQueryStringBuilder = (function () {
        function UrlQueryStringBuilder() {
            this.query = {};
        }
        UrlQueryStringBuilder.prototype.toString = function () {
            var result = [];
            for (var key in this.query) {
                result.push(key + "=" + encodeURIComponent(this.query[key]));
            }
            return this.path + "?" + result.join('&');
        };
        UrlQueryStringBuilder.parse = function (url) {
            var result = new UrlQueryStringBuilder();
            var temp = url.splitCount('?', 2);
            result.path = temp[0];
            temp[1].split('&').forEach(function (item) {
                var keyValue = item.splitCount('=', 2);
                result.query[keyValue[0]] = decodeURIComponent(keyValue[1]);
            });
            return result;
        };
        return UrlQueryStringBuilder;
    }());
    MediaGet.UrlQueryStringBuilder = UrlQueryStringBuilder;
})(MediaGet || (MediaGet = {}));
var MediaGet;
(function (MediaGet) {
    "use strict";
    var MethodTypes;
    (function (MethodTypes) {
        MethodTypes[MethodTypes["GET"] = 0] = "GET";
        MethodTypes[MethodTypes["POST"] = 1] = "POST";
    })(MethodTypes = MediaGet.MethodTypes || (MediaGet.MethodTypes = {}));
    var ExtractorBase = (function () {
        function ExtractorBase() {
        }
        ExtractorBase.prototype.isMatch = function (url) {
            return this.constructor['urlRule'].test(url);
        };
        ;
        ExtractorBase.prototype.safeEval = function (script) {
            return eval("(function(){" + script + "})()");
        };
        //#region Extractor Factory
        ExtractorBase.prototype.downloadStringAsync = function (method, url, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var xhr = new XMLHttpRequest();
                            xhr.onreadystatechange = function () {
                                if (xhr.readyState !== 4)
                                    return;
                                if (xhr.status >= 200 && xhr.status < 300) {
                                    resolve(xhr.responseText);
                                }
                                else {
                                    reject(xhr.statusText);
                                }
                            };
                            xhr.open(MethodTypes[method], url, true);
                            xhr.send();
                        })];
                });
            });
        };
        ExtractorBase.prototype.downloadJSONAsync = function (method, url, data) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = (_a = JSON).parse;
                            return [4 /*yield*/, this.downloadStringAsync(method, url, data)];
                        case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                    }
                });
            });
        };
        ExtractorBase.prototype.ParseHTML = function (HTMLString) {
            return new DOMParser().parseFromString(HTMLString, "text/html");
        };
        ExtractorBase.prototype.ParseXML = function (XMLString) {
            return new DOMParser().parseFromString(XMLString, "text/xml");
        };
        ExtractorBase.prototype.downloadHtmlDocumentAsync = function (method, url, data) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.ParseHTML;
                            return [4 /*yield*/, this.downloadStringAsync(method, url, data)];
                        case 1: return [2 /*return*/, _a.apply(this, [_b.sent()])];
                    }
                });
            });
        };
        return ExtractorBase;
    }());
    MediaGet.ExtractorBase = ExtractorBase;
})(MediaGet || (MediaGet = {}));
var MediaGet;
(function (MediaGet) {
    "use strict";
    /**
     * 剖析結果的相關資訊
     */
    var MediaInfo = (function () {
        function MediaInfo() {
            /**
             * 媒體其他相關屬性
             */
            this.attributes = {};
        }
        /*
         * 取得深層副本
         */
        MediaInfo.prototype.clone = function () {
            var result = new MediaInfo();
            for (var key in result) {
                if (key == "attributes") {
                    for (var key2 in this[key])
                        result.attributes[key2] = this.attributes[key2];
                }
                else {
                    result[key] = this[key];
                }
            }
            return result;
        };
        return MediaInfo;
    }());
    MediaGet.MediaInfo = MediaInfo;
})(MediaGet || (MediaGet = {}));
var MediaGet;
(function (MediaGet) {
    var MediaTypes;
    (function (MediaTypes) {
        MediaTypes[MediaTypes["Video"] = 0] = "Video";
        MediaTypes[MediaTypes["Audio"] = 1] = "Audio";
    })(MediaTypes = MediaGet.MediaTypes || (MediaGet.MediaTypes = {}));
})(MediaGet || (MediaGet = {}));
var MediaGet;
(function (MediaGet) {
    function urlRule(config) {
        return function (target) {
            target['urlRule'] = config.url;
        };
    }
    MediaGet.urlRule = urlRule;
})(MediaGet || (MediaGet = {}));
var MediaGet;
(function (MediaGet) {
    var Extractors;
    (function (Extractors) {
        "use strict";
        /*
         * 針對Dailymotion的剖析器
         */
        var DailymotionExtractor = DailymotionExtractor_1 = (function (_super) {
            __extends(DailymotionExtractor, _super);
            function DailymotionExtractor() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            DailymotionExtractor.prototype.getMediaInfosAsync = function (url) {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                var dailyPage, mediaJSON, result, temp, quality, newItem;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!this.isMatch(url))
                                                throw new MediaGet.UrlFormatException();
                                            return [4 /*yield*/, this.downloadHtmlDocumentAsync(MediaGet.MethodTypes.GET, url, null)];
                                        case 1:
                                            dailyPage = _a.sent();
                                            console.log("GGG");
                                            if (!document) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.loadHTMLFromIframe(url)];
                                        case 2:
                                            dailyPage = _a.sent();
                                            _a.label = 3;
                                        case 3:
                                            mediaJSON = this.getMediaJObject(dailyPage);
                                            result = [];
                                            temp = new MediaGet.MediaInfo();
                                            temp.name = mediaJSON.metadata.title;
                                            temp.description = dailyPage.querySelector('[property="og:description"]').getAttribute('content');
                                            temp.duration = mediaJSON.metadata.duration;
                                            temp.sourceUrl = url;
                                            temp.thumbnail = mediaJSON.metadata.filmstrip_url;
                                            temp.type = MediaGet.MediaTypes.Video;
                                            temp.extractorType = DailymotionExtractor_1;
                                            for (quality in mediaJSON.metadata.qualities) {
                                                if (quality == "auto")
                                                    continue;
                                                newItem = temp.clone();
                                                newItem.realUrl = mediaJSON.metadata.qualities[quality].filter(function (x) { return x.type == "video/mp4"; })[0].url;
                                                newItem.attributes['mime'] = 'video/mp4';
                                                newItem.attributes['quality'] = quality;
                                                result.push(newItem);
                                            }
                                            resolve(result);
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    });
                });
            };
            DailymotionExtractor.prototype.loadHTMLFromIframe = function (url) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Promise(function (res, rej) {
                                var f = document.createElement('iframe');
                                document.body.appendChild(f);
                                f.hidden = true;
                                f.onload = function () {
                                    res(f.contentDocument);
                                    document.body.removeChild(f);
                                };
                                f.src = url;
                            })];
                    });
                });
            };
            DailymotionExtractor.prototype.getMediaJObject = function (htmlDoc) {
                function toArray(THIS) {
                    var result = new Array();
                    for (var i = 0; i < THIS.length; i++)
                        result.push(THIS[i]);
                    return result;
                }
                var script = toArray(htmlDoc.querySelectorAll("script"))
                    .filter(function (item) { return item.textContent != null && item.textContent.indexOf("__PLAYER_CONFIG__") > -1; })[0].textContent;
                script = script.substring(0, script.indexOf("var __PLAYER_BODY__"));
                return this.safeEval(script + ";return __PLAYER_CONFIG__;");
            };
            return DailymotionExtractor;
        }(MediaGet.ExtractorBase));
        DailymotionExtractor = DailymotionExtractor_1 = __decorate([
            MediaGet.urlRule({ url: /http(s)?:\/\/www.dailymotion.com\/video\/.+/ })
        ], DailymotionExtractor);
        Extractors.DailymotionExtractor = DailymotionExtractor;
        var DailymotionExtractor_1;
    })(Extractors = MediaGet.Extractors || (MediaGet.Extractors = {}));
})(MediaGet || (MediaGet = {}));
var MediaGet;
(function (MediaGet) {
    var Extractors;
    (function (Extractors) {
        "use strict";
        /*
         * 針對Xuite的剖析器
         */
        var XuiteExtractor = XuiteExtractor_1 = (function (_super) {
            __extends(XuiteExtractor, _super);
            function XuiteExtractor() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            XuiteExtractor.prototype.getMediaInfosAsync = function (url) {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                var mediaId, apiData, result, baseInfo, def_src, flv_src, hq_src, hd1080_src;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!this.isMatch(url))
                                                throw new MediaGet.UrlFormatException();
                                            mediaId = this.getMediaId(url);
                                            return [4 /*yield*/, this.getMediaApiData(mediaId)];
                                        case 1:
                                            apiData = _a.sent();
                                            result = new Array();
                                            baseInfo = new MediaGet.MediaInfo();
                                            baseInfo.sourceUrl = url;
                                            baseInfo.name = apiData.title;
                                            baseInfo.duration = parseFloat(apiData.duration);
                                            baseInfo.description = apiData.description;
                                            baseInfo.thumbnail = apiData.thumb;
                                            baseInfo.extractorType = XuiteExtractor_1;
                                            baseInfo.type = apiData.type == 'video' ? MediaGet.MediaTypes.Video : MediaGet.MediaTypes.Audio;
                                            baseInfo.attributes.author = apiData.author_name;
                                            if (apiData.src) {
                                                def_src = baseInfo.clone();
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
                                                flv_src = baseInfo.clone();
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
                                                hq_src = baseInfo.clone();
                                                hq_src.realUrl = apiData.hq_src;
                                                if (baseInfo.type == MediaGet.MediaTypes.Video) {
                                                    hq_src.attributes.size = '1280x720';
                                                    hq_src.attributes.quality = 'hq';
                                                }
                                                hq_src.attributes.mime = 'video/mp4';
                                                result.push(hq_src);
                                            }
                                            if (apiData.hd1080_src) {
                                                hd1080_src = baseInfo.clone();
                                                hd1080_src.realUrl = apiData.hd1080_src;
                                                if (baseInfo.type == MediaGet.MediaTypes.Video) {
                                                    hd1080_src.attributes.size = '1920x1080';
                                                    hd1080_src.attributes.quality = 'hd';
                                                }
                                                hd1080_src.attributes.mime = 'video/mp4';
                                                result.push(hd1080_src);
                                            }
                                            return [2 /*return*/, result];
                                    }
                                });
                            }); })];
                    });
                });
            };
            XuiteExtractor.prototype.getMediaApiData = function (mediaId) {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                var apiData, propertys, result, i, key, value;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.downloadHtmlDocumentAsync(MediaGet.MethodTypes.GET, "http://vlog.xuite.net/flash/player?media=" + mediaId)];
                                        case 1:
                                            apiData = _a.sent();
                                            propertys = apiData.getElementsByTagName('property');
                                            result = {};
                                            for (i = 0; i < propertys.length; i++) {
                                                key = atob(propertys[i].getAttribute('id'));
                                                value = atob(propertys[i].textContent);
                                                if (!value || value.length)
                                                    result[key] = decodeURIComponent(value);
                                            }
                                            return [2 /*return*/, result];
                                    }
                                });
                            }); })];
                    });
                });
            };
            XuiteExtractor.prototype.getMediaId = function (url) {
                return btoa(atob(url.split('/').last().innerString('-', '.')));
            };
            return XuiteExtractor;
        }(MediaGet.ExtractorBase));
        XuiteExtractor = XuiteExtractor_1 = __decorate([
            MediaGet.urlRule({ url: /http(s)?:\/\/vlog.xuite.net\/play\/.+/ })
        ], XuiteExtractor);
        Extractors.XuiteExtractor = XuiteExtractor;
        var XuiteExtractor_1;
    })(Extractors = MediaGet.Extractors || (MediaGet.Extractors = {}));
})(MediaGet || (MediaGet = {}));
var MediaGet;
(function (MediaGet) {
    var Extractors;
    (function (Extractors) {
        "use strict";
        /*
         * 針對Youtube的剖析器
         */
        var YoutubeExtractor = YoutubeExtractor_1 = (function (_super) {
            __extends(YoutubeExtractor, _super);
            function YoutubeExtractor() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            YoutubeExtractor.prototype.getMediaInfosAsync = function (url) {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    var youtubePage, mediaJSON, ytInitData, description, desArray, decodingFunction, streamFormatList, streamMap, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!this.isMatch(url))
                                    throw new MediaGet.UrlFormatException();
                                return [4 /*yield*/, this.downloadHtmlDocumentAsync(MediaGet.MethodTypes.GET, url, null)];
                            case 1:
                                youtubePage = _a.sent();
                                mediaJSON = this.getMediaJObject(youtubePage);
                                if (mediaJSON['args']['livestream'] == '1')
                                    throw new MediaGet.NotSupportException();
                                ytInitData = this.getYtInitialData(youtubePage);
                                description = "";
                                try {
                                    desArray = ytInitData.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.description.runs;
                                    description = desArray.map(function (item) {
                                        return item.text;
                                    }).join("\r\n");
                                }
                                catch (e) { }
                                return [4 /*yield*/, this.getDecodingFunction("https:" + mediaJSON['assets']['js'])];
                            case 2:
                                decodingFunction = _a.sent();
                                streamFormatList = this.getStreamFormatList(mediaJSON);
                                streamMap = this.getStreamMap(mediaJSON);
                                result = new Array();
                                streamMap.forEach(function (item) {
                                    var resultItem = new MediaGet.MediaInfo();
                                    //#region 通用屬性
                                    resultItem.sourceUrl = url;
                                    resultItem.extractorType = YoutubeExtractor_1;
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
                                return [2 /*return*/, result];
                        }
                    });
                });
            };
            YoutubeExtractor.prototype.getMediaJObject = function (htmlDoc) {
                var script = htmlDoc.querySelectorAll("script").toArray()
                    .filter(function (item) { return item.textContent != null && item.textContent.indexOf("var ytplayer") > -1; })[0].textContent;
                script = script.substring(0, script.indexOf("ytplayer.load"));
                return this.safeEval(script + ";return ytplayer.config;");
            };
            YoutubeExtractor.prototype.getYtInitialData = function (htmlDoc) {
                var script = htmlDoc.querySelectorAll("script").toArray()
                    .filter(function (item) { return item.textContent != null && item.textContent.indexOf('window["ytInitialData"]') > -1; })[0].textContent;
                return this.safeEval(script + ";return window['ytInitialData']");
            };
            YoutubeExtractor.prototype.getDecodingFunction = function (url) {
                return __awaiter(this, void 0, void 0, function () {
                    var _this = this;
                    var playerScript, functionName, functionBody, functionRefName, functionRef, args;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, this.downloadStringAsync(MediaGet.MethodTypes.GET, url)];
                            case 1:
                                playerScript = _a.sent();
                                functionName = playerScript.innerString('"signature",', "))")
                                    .innerString('"signature",', "(");
                                if (functionName == null || functionName.length == 0) {
                                    functionName = playerScript.innerString('"signature",', "))");
                                    functionName = functionName.substring(0, functionName.indexOf("("));
                                }
                                console.log("FunctionName " + functionName);
                                if (functionName == null || functionName.length == 0)
                                    return [2 /*return*/, function (value, inUrl) { return value; }];
                                functionBody = "function" + playerScript.innerString("\n" + functionName + "=function", '}') + ";}";
                                console.log("FunctionBody " + functionBody);
                                functionRefName = functionBody.innerString(";", ".");
                                functionRef = playerScript.innerString("var " + functionRefName + "=", "};") + "}";
                                console.log("FunctionRef " + functionRef);
                                args = functionBody.innerString("(", ")");
                                functionBody = functionBody.substring(functionBody.indexOf("{") + 1);
                                functionBody = "function(" + args + "){var " + functionRefName + "=" + functionRef + ";" + functionBody;
                                return [2 /*return*/, function (value, inUrl) {
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
                                    }];
                        }
                    });
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
                        console.log(typeJSON);
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
        YoutubeExtractor = YoutubeExtractor_1 = __decorate([
            MediaGet.urlRule({ url: /http(s)?:\/\/www.youtube.com\/watch\?v=.+/ })
        ], YoutubeExtractor);
        Extractors.YoutubeExtractor = YoutubeExtractor;
        var YoutubeExtractor_1;
    })(Extractors = MediaGet.Extractors || (MediaGet.Extractors = {}));
})(MediaGet || (MediaGet = {}));
