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
    (function (MethodTypes) {
        MethodTypes[MethodTypes["GET"] = 0] = "GET";
        MethodTypes[MethodTypes["POST"] = 1] = "POST";
    })(MediaGet.MethodTypes || (MediaGet.MethodTypes = {}));
    var MethodTypes = MediaGet.MethodTypes;
    class ExtractorBase {
        isMatch(url) {
            return MediaGet.matchRegex[this.constructor].test(url);
        }
        ;
        //#region Extractor Factory
        downloadStringAsync(method, url, data) {
            return __awaiter(this, void 0, Promise, function* () {
                return new Promise((resolve, reject) => {
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
                });
            });
        }
        downloadJSONAsync(method, url, data) {
            return __awaiter(this, void 0, Promise, function* () {
                return JSON.parse(yield this.downloadStringAsync(method, url, data));
            });
        }
        ParseHTML(HTMLString) {
            return new DOMParser().parseFromString(HTMLString, "text/html");
        }
        ParseXML(XMLString) {
            return new DOMParser().parseFromString(XMLString, "text/xml");
        }
        downloadHtmlDocumentAsync(method, url, data) {
            return __awaiter(this, void 0, Promise, function* () {
                return this.ParseHTML(yield this.downloadStringAsync(method, url, data));
            });
        }
    }
    MediaGet.ExtractorBase = ExtractorBase;
})(MediaGet || (MediaGet = {}));
//# sourceMappingURL=ExtractorBase.js.map