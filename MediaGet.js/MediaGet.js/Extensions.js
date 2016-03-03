NodeList.prototype.toArray = function () {
    var result = new Array();
    for (var i = 0; i < this.length; i++)
        result.push(this[i]);
    return result;
};
String.prototype.innerString = function (start, end) {
    if (this.indexOf(start) < 0)
        return null;
    var result = this;
    result = result.substring(result.indexOf(start) + start.length);
    return result.substring(0, result.indexOf(end));
};
String.prototype.splitCount = function (sig, count) {
    var result = new Array();
    var temp = this.split(sig);
    for (var i = 0; i < count - 1; i++) {
        result.push(temp.shift());
    }
    result.push(temp.join(sig));
    return result;
};
var MediaGet;
(function (MediaGet) {
    class UrlQueryStringBuilder {
        constructor() {
            this.query = {};
        }
        toString() {
            var result = [];
            for (var key in this.query) {
                result.push(key + "=" + encodeURIComponent(this.query[key]));
            }
            return this.path + "?" + result.join('&');
        }
        static parse(url) {
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
    MediaGet.UrlQueryStringBuilder = UrlQueryStringBuilder;
})(MediaGet || (MediaGet = {}));
//# sourceMappingURL=Extensions.js.map