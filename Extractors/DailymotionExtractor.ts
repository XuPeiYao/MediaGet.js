module MediaGet.Extractors {

    "use strict";
    /*
     * 針對Dailymotion的剖析器
     */
    @urlRule({ url: /http(s)?:\/\/www.dailymotion.com\/video\/.+/ })
    export class DailymotionExtractor extends ExtractorBase {

        public async getMediaInfosAsync(url: string): Promise<MediaInfo[]> {
            return new Promise<MediaInfo[]>(async (resolve, reject) => {
                if (!this.isMatch(url)) throw new UrlFormatException();
                var dailyPage = await this.downloadHtmlDocumentAsync(MethodTypes.GET, url, null);
                console.log("GGG");
                if(document){//in browser
                    dailyPage = await this.loadHTMLFromIframe(url);
                }
                
                var mediaJSON: any = this.getMediaJObject(dailyPage);
                
                var result = [];

                var temp = new MediaInfo();
                temp.name = mediaJSON.metadata.title;
                temp.description = dailyPage.querySelector('[property="og:description"]').getAttribute('content');
                temp.duration = mediaJSON.metadata.duration;
                temp.sourceUrl = url;
                temp.thumbnail = mediaJSON.metadata.filmstrip_url;
                temp.type = MediaTypes.Video;
                temp.extractorType = DailymotionExtractor;                

                for(var quality in mediaJSON.metadata.qualities){
                    if(quality == "auto")continue;
                    var newItem = temp.clone();
                    newItem.realUrl = mediaJSON.metadata.qualities[quality].filter(x=>x.type=="video/mp4")[0].url;
                    newItem.attributes['mime'] = 'video/mp4';
                    newItem.attributes['quality'] = quality;                
                    result.push(newItem);
                }
                
                resolve(result);
            });
        }
        public async loadHTMLFromIframe(url: string): Promise<Document>{
            return new Promise<Document>((res,rej)=>{
                var f  = document.createElement('iframe');
                document.body.appendChild(f)
                f.hidden = true;                
                f.onload = function(){ 
                    res(<any>f.contentDocument);
                    document.body.removeChild(f);
                }
                f.src = url;
            });
        }

        public getMediaJObject(htmlDoc: HTMLDocument){
            function toArray(THIS): Array<Node> {
                var result = new Array<Node>();
                for (var i = 0; i < THIS.length; i++)result.push(THIS[i]);
                return result;
            }
            var script = toArray(htmlDoc.querySelectorAll("script"))
                .filter(item => item.textContent != null && item.textContent.indexOf("__PLAYER_CONFIG__") > -1)[0].textContent;
            script = script.substring(0, script.indexOf("var __PLAYER_BODY__"));
            return this.safeEval<JSON>(script + ";return __PLAYER_CONFIG__;");
        }

    }
}