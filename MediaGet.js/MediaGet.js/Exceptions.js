var MediaGet;
(function (MediaGet) {
    class Exception {
    }
    MediaGet.Exception = Exception;
    class NotSupportException extends Exception {
        constructor() {
            super();
            this.name = "不支援項目";
        }
    }
    MediaGet.NotSupportException = NotSupportException;
    class ArgumentsException extends Exception {
        constructor() {
            super();
            this.name = "不正確的參數";
        }
    }
    MediaGet.ArgumentsException = ArgumentsException;
    class UrlFormatException extends ArgumentsException {
        constructor() {
            super();
            this.name = "不正確的參數";
            this.message = "不支援的目標連結";
        }
    }
    MediaGet.UrlFormatException = UrlFormatException;
})(MediaGet || (MediaGet = {}));
//# sourceMappingURL=Exceptions.js.map