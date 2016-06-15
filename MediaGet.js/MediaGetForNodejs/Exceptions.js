var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
            _super.call(this);
            this.name = "不支援項目";
        }
        return NotSupportException;
    }(Exception));
    MediaGet.NotSupportException = NotSupportException;
    var ArgumentsException = (function (_super) {
        __extends(ArgumentsException, _super);
        function ArgumentsException() {
            _super.call(this);
            this.name = "不正確的參數";
        }
        return ArgumentsException;
    }(Exception));
    MediaGet.ArgumentsException = ArgumentsException;
    var UrlFormatException = (function (_super) {
        __extends(UrlFormatException, _super);
        function UrlFormatException() {
            _super.call(this);
            this.name = "不正確的參數";
            this.message = "不支援的目標連結";
        }
        return UrlFormatException;
    }(ArgumentsException));
    MediaGet.UrlFormatException = UrlFormatException;
})(MediaGet || (MediaGet = {}));
//# sourceMappingURL=Exceptions.js.map