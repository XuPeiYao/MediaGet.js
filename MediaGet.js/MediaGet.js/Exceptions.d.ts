declare module MediaGet {
    class Exception {
        name: string;
        message: string;
    }
    class NotSupportException extends Exception {
        constructor();
    }
    class ArgumentsException extends Exception {
        constructor();
    }
    class UrlFormatException extends ArgumentsException {
        constructor();
    }
}
