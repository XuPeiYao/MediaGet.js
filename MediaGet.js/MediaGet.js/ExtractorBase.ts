module MediaGet {
    export enum MethodTypes{ GET,POST }
    export abstract class ExtractorBase implements IExtractor {
        public abstract async getMediaInfosAsync(url: string | URL): Promise<MediaInfo[]>;
        public isMatch(url: string | URL): boolean {
            return matchRegex[<any>this.constructor].test(url);
        };

        //#region Extractor Factory
        protected async downloadStringAsync(method: MethodTypes, url: string | URL, data: any): Promise<string> {
            return new Promise<string>((resolve, reject) => {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState !== 4) return;
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(xhr.responseText);
                    } else {
                        reject(xhr.statusText);
                    }
                };
                xhr.open(MethodTypes[method], <string>url, true);
                xhr.send();
            });
        }
        
        protected async downloadJSONAsync(method: MethodTypes, url: string | URL, data: any): Promise<JSON> {
            return JSON.parse(await this.downloadStringAsync(method, url, data));
        }

        private ParseHTML(HTMLString: string): HTMLDocument{
            return new DOMParser().parseFromString(HTMLString, "text/html");
        }

        private ParseXML(XMLString: string): XMLDocument {
            return new DOMParser().parseFromString(XMLString, "text/xml");
        }

        protected async downloadHtmlDocumentAsync(method: MethodTypes, url: string | URL, data: any): Promise<HTMLDocument> {
            return this.ParseHTML(await this.downloadStringAsync(method, url, data));
        }
        //#endregion
    }
}