module MediaGet {
    "use strict";
    export class Exception {
        public name: string;
        public message: string;
    }
    export class NotSupportException extends Exception{
        public constructor() {
            super();
            this.name = "不支援項目";
        }
    }
    export class ArgumentsException extends Exception {
        public constructor() {
            super();
            this.name = "不正確的參數";
        }
    }
    export class UrlFormatException extends ArgumentsException {
        public constructor() {
            super();
            this.name = "不正確的參數";
            this.message = "不支援的目標連結";
        }
    }
}