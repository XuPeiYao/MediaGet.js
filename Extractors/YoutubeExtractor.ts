﻿module MediaGet.Extractors {
    "use strict";
    /*
     * 針對Youtube的剖析器
     */
    @urlRule({ url: /http(s)?:\/\/www.youtube.com\/watch\?v=.+/ })
    export class YoutubeExtractor extends ExtractorBase {
        public async getMediaInfosAsync(url: string): Promise<MediaInfo[]> {
            if (!this.isMatch(url)) throw new UrlFormatException();
            var youtubePage = await this.downloadHtmlDocumentAsync(MethodTypes.GET, url, null);
            var mediaJSON = this.getMediaJObject(youtubePage);

            if (mediaJSON['args']['livestream'] == '1') throw new NotSupportException();

            var ytInitData = this.getYtInitialData(youtubePage) as any;

            var description = "";
            try {
                var desArray: Array<any> = ytInitData.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.description.runs;
                description = desArray.map(item => {
                    return item.text;
                }).join("\r\n");
            } catch (e) { }

            var decodingFunction = await this.getDecodingFunction("https:" + mediaJSON['assets']['js']);

            var streamFormatList = this.getStreamFormatList(mediaJSON);

            var streamMap = this.getStreamMap(mediaJSON);

            var result = new Array<MediaInfo>();

            streamMap.forEach(item => {
                var resultItem = new MediaInfo();
                //#region 通用屬性
                resultItem.sourceUrl = url;
                resultItem.extractorType = YoutubeExtractor;
                resultItem.name = mediaJSON['args']['title'];
                resultItem.duration = mediaJSON['args']['length_seconds'];
                resultItem.description = description;
                resultItem.thumbnail = mediaJSON['args']['thumbnail_url'];
                resultItem.type = this.convertMediaTypes(item['type']['mime']);
                //#endregion

                //#region 連結解密
                var realUrlBuilder = UrlQueryStringBuilder.parse(item['url']);
                var urlSignature = realUrlBuilder.query['s'] || realUrlBuilder.query['sig'] || realUrlBuilder.query['signature'];
                var itemSignature = item['s'] || item['sig'] || item['signature'];
                realUrlBuilder.query['signature'] = decodingFunction(urlSignature || itemSignature, urlSignature != null);

                resultItem.realUrl = realUrlBuilder.toString();
                //#endregion

                //#region 擴充屬性
                resultItem.attributes['mime'] = item['type']['mime'];
                resultItem.attributes['codecs'] = item['type']['codecs'];
                resultItem.attributes['author'] = mediaJSON['args']['author'];
                if (resultItem.type == MediaTypes.Video) {
                    resultItem.attributes['size'] = item['size'] || streamFormatList[item['itag']];
                    resultItem.attributes['quality'] = item['quality'];
                } else if (resultItem.type == MediaTypes.Audio) {
                    resultItem.attributes['bitrate'] = item['bitrate'];
                }
                //#endregion

                result.push(resultItem);
            });

            return result;
        }

        private getMediaJObject(htmlDoc: HTMLDocument): JSON {
            var script = htmlDoc.querySelectorAll("script").toArray()
                .filter(item => item.textContent != null && item.textContent.indexOf("var ytplayer") > -1)[0].textContent;
            script = script.substring(0, script.indexOf("ytplayer.load"));
            return this.safeEval<JSON>(script + ";return ytplayer.config;");
        }

        private getYtInitialData(htmlDoc: HTMLDocument): JSON {
            var script = htmlDoc.querySelectorAll("script").toArray()
                .filter(item => item.textContent != null && item.textContent.indexOf('window["ytInitialData"]') > -1)[0].textContent;

            return this.safeEval<JSON>(script + ";return window['ytInitialData']");
        }

        private async getDecodingFunction(url: string): Promise<(value: string, inUrl: boolean) => string> {
            var playerScript = await this.downloadStringAsync(MethodTypes.GET, url);

            var functionName = playerScript.innerString('"signature",', "))")
                .innerString('"signature",', "(");

            if (functionName == null || functionName.length == 0) {
                functionName = playerScript.innerString('"signature",', "))");
                functionName = functionName.substring(0, functionName.indexOf("("));
            }

            console.log("FunctionName " + functionName);

            if (functionName == null || functionName.length == 0) return (value: string, inUrl: boolean) => value;

            var functionBody = `function${playerScript.innerString(`\n${functionName}=function`, '}')};}`;

            console.log("FunctionBody " + functionBody);

            var functionRefName = functionBody.innerString(";", ".");
            var functionRef = playerScript.innerString("var " + functionRefName + "=", "};") + "}";
            console.log("FunctionRef " + functionRef);
            var args = functionBody.innerString("(", ")");
            functionBody = functionBody.substring(functionBody.indexOf("{") + 1);
            functionBody = "function(" + args + "){var " + functionRefName + "=" + functionRef + ";" + functionBody;

            return (value: string, inUrl: boolean) => {
                var scriptResult = this.safeEval<string>("return (" + functionBody + ")('" + value + "');");
                var result = value;
                if (inUrl) {
                    if (value.length != 81 && scriptResult.length == 81) result = scriptResult;
                } else {
                    result = scriptResult;
                }
                return result;
            };
        }

        private getStreamFormatList(mediaJSON: JSON): any {
            var result = {};
            (<string>mediaJSON['args']['fmt_list']).split(',').map(item => item.split('/')).forEach(item => {
                result[item[0]] = item[1];
            });;
            return result;
        }

        private getStreamMap(mediaJSON: JSON): any[] {
            function getStreamMapByKey(_mediaJSON_: JSON, key: string): any[] {
                if (!_mediaJSON_['args'][key]) return null;
                var result = (<string>_mediaJSON_['args'][key]).split(',')
                    .map(item => item.split('&'))
                    .map(item => {
                        var temp = {};
                        item.forEach(item2 => {
                            var keyValue = item2.splitCount('=', 2);
                            temp[keyValue[0]] = decodeURIComponent(keyValue[1]);
                        });
                        return temp;
                    });
                result.forEach(item => {
                    var hasCodecs = item['type'].indexOf(';');
                    var typeJSON = {};
                    typeJSON['mime'] = item['type'].substring(0, hasCodecs == -1 ? item['type'].length : hasCodecs);
                    console.log(typeJSON);
                    if (hasCodecs > -1) {
                        var temp = item['type'].innerString('"', '"');
                        if (temp) temp.replace(/\+/g, "");
                        typeJSON['codecs'] = temp;
                    }
                    item['type'] = typeJSON;
                });
                return result;
            }
            return getStreamMapByKey(mediaJSON, 'url_encoded_fmt_stream_map').concat(
                getStreamMapByKey(mediaJSON, 'adaptive_fmts') || []
            );
        }

        private convertMediaTypes(mime: string): MediaTypes {
            mime = mime.split('/')[0];
            if (mime == 'video') return MediaTypes.Video;
            return MediaTypes.Audio;
        }
    }
}