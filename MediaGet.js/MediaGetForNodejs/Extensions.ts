/*interface NodeList {
    toArray():Array<Node>;
}*/
interface Array<T> {
    first(): T;
    last(): T;
}
interface String {
    innerString(start: string, end: string): string;
    splitCount(sig: string, count: number): string[];
}
/*
NodeList.prototype.toArray = function (): Array<Node> {
    var result = new Array<Node>();
    for (var i = 0; i < this.length; i++)result.push(this[i]);
    return result;
}*/
Array.prototype.first = function () {
    return this[0];
}
Array.prototype.last = function () {
    return this[this.length - 1];
}
String.prototype.innerString = function (start: string, end: string): string {
    var index = this.indexOf(start);
    if (index < 0) return null;
    var result: string = this.substring(index + start.length);
    index = result.indexOf(end);
    if (index < 0) return null;
    return result.substring(0, index);
}
String.prototype.splitCount = function (sig: string, count: number): string[]{
    var result = new Array<string>();
    var temp = this.split(sig);
    for (var i = 0; i < count - 1; i++) {
        result.push(temp.shift());
    }
    result.push(temp.join(sig));
    return result;
}

module MediaGet {
    "use strict";
    export class UrlQueryStringBuilder {
        public path: string;
        public query: any = {};

        public toString(): string {
            var result = [];
            for (var key in this.query) {
                result.push(key + "=" + encodeURIComponent(this.query[key]));
            }

            return this.path + "?" + result.join('&');
        }

        public static parse(url: string): UrlQueryStringBuilder{
            var result = new UrlQueryStringBuilder();
            var temp = url.splitCount('?', 2);
            result.path = temp[0];

            temp[1].split('&').forEach(item => {
                var keyValue = item.splitCount('=', 2);
                result.query[keyValue[0]] = decodeURIComponent(keyValue[1]);
            });
            return result;
        }
    }
}