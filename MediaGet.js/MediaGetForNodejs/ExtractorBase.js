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
    "use strict";
    (function (MethodTypes) {
        MethodTypes[MethodTypes["GET"] = 0] = "GET";
        MethodTypes[MethodTypes["POST"] = 1] = "POST";
    })(MediaGet.MethodTypes || (MediaGet.MethodTypes = {}));
    var MethodTypes = MediaGet.MethodTypes;
    var ExtractorBase = (function () {
        function ExtractorBase() {
        }
        ExtractorBase.prototype.isMatch = function (url) {
            return MediaGet.matchRegex[this.constructor].test(url);
        };
        ;
        ExtractorBase.prototype.safeEval = function (script) {
            return eval("(function(){var window = {};" + script + "})()");
        };
        //#region Extractor Factory
        ExtractorBase.prototype.downloadStringAsync = function (method, url, data) {
            return __awaiter(this, void 0, Promise, function* () {
                return new Promise(function (resolve, reject) {
                    var xhr = new (require('xmlhttprequest').XMLHttpRequest)();
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
        };
        ExtractorBase.prototype.downloadJSONAsync = function (method, url, data) {
            return __awaiter(this, void 0, Promise, function* () {
                return JSON.parse(yield this.downloadStringAsync(method, url, data));
            });
        };
        ExtractorBase.prototype.ParseHTML = function (HTMLString) {
            return new (require('xmldom').DOMParser)().parseFromString(HTMLString, "text/html");
        };
        ExtractorBase.prototype.ParseXML = function (XMLString) {
            return new (require('xmldom').DOMParser)().parseFromString(XMLString, "text/xml");
        };
        ExtractorBase.prototype.downloadHtmlDocumentAsync = function (method, url, data) {
            return __awaiter(this, void 0, Promise, function* () {
                return this.ParseHTML(yield this.downloadStringAsync(method, url, data));
            });
        };
        return ExtractorBase;
    }());
    MediaGet.ExtractorBase = ExtractorBase;
})(MediaGet || (MediaGet = {}));
//# sourceMappingURL=ExtractorBase.js.map