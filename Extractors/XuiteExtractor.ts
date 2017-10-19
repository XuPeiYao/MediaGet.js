module MediaGet.Extractors {
    "use strict";
    /*
     * 針對Xuite的剖析器
     */
    @urlRule({ url: /http(s)?:\/\/vlog.xuite.net\/play\/.+/ })
    export class XuiteExtractor extends ExtractorBase {
        public async getMediaInfosAsync(url: string): Promise<MediaInfo[]> {
            return new Promise<MediaInfo[]>(async (resolve, reject) => {
                if (!this.isMatch(url)) throw new UrlFormatException();
                var mediaId = this.getMediaId(url);

                var apiData = await this.getMediaApiData(mediaId);

                var result = new Array<MediaInfo>();

                var baseInfo = new MediaInfo();
                baseInfo.sourceUrl = url;
                baseInfo.name = apiData.title;
                baseInfo.duration = parseFloat(apiData.duration);
                baseInfo.description = apiData.description;
                baseInfo.thumbnail = apiData.thumb;
                baseInfo.extractorType = XuiteExtractor;
                baseInfo.type = apiData.type == 'video' ? MediaTypes.Video : MediaTypes.Audio;
                baseInfo.attributes.author = apiData.author_name;

                if (apiData.src) {
                    var def_src = baseInfo.clone();
                    def_src.realUrl = apiData.src;

                    if (baseInfo.type == MediaTypes.Video) {
                        def_src.attributes.size = '480x360';
                        def_src.attributes.quality = 'default';
                        def_src.attributes.mime = 'video/mp4';
                    } else if (baseInfo.type == MediaTypes.Audio) {
                        def_src.attributes.mime = 'audio/mp3';
                    }
                    result.push(def_src);
                }

                if (apiData.flv_src) {//360 flv
                    var flv_src = baseInfo.clone();
                    flv_src.realUrl = apiData.flv_src;

                    if (baseInfo.type == MediaTypes.Video) {
                        flv_src.attributes.size = '480x360';
                        flv_src.attributes.quality = 'default';
                        flv_src.attributes.mime = 'video/x-flv';
                    } else {
                        flv_src.attributes.mime = 'audio/x-flv';
                    }
                    result.push(flv_src);
                }

                if (apiData.hq_src) {//720
                    var hq_src = baseInfo.clone();
                    hq_src.realUrl = apiData.hq_src;

                    if (baseInfo.type == MediaTypes.Video) {
                        hq_src.attributes.size = '1280x720';
                        hq_src.attributes.quality = 'hq';
                    }
                    hq_src.attributes.mime = 'video/mp4';

                    result.push(hq_src);
                }

                if (apiData.hd1080_src) {//1080
                    var hd1080_src = baseInfo.clone();
                    hd1080_src.realUrl = apiData.hd1080_src;

                    if (baseInfo.type == MediaTypes.Video) {
                        hd1080_src.attributes.size = '1920x1080';
                        hd1080_src.attributes.quality = 'hd';
                    }
                    hd1080_src.attributes.mime = 'video/mp4';

                    result.push(hd1080_src);
                }

                return result;
            });
        }

        private async getMediaApiData(mediaId: string): Promise<any> {
            return new Promise<any>(async (resolve, reject) => {
                var apiData = await this.downloadHtmlDocumentAsync(MethodTypes.GET, `http://vlog.xuite.net/flash/player?media=${mediaId}`);
                var propertys = apiData.getElementsByTagName('property');

                var result = {};
                for (var i = 0; i < propertys.length; i++) {
                    var key = atob(propertys[i].getAttribute('id'));
                    var value = atob(propertys[i].textContent);

                    if (!value || value.length) result[key] = decodeURIComponent(value);
                }
                return result;
            });
        }

        private getMediaId(url: string): string {
            return btoa(atob(url.split('/').last().innerString('-', '.')));
        }
    }
}