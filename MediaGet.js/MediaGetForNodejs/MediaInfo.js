var MediaGet;
(function (MediaGet) {
    "use strict";
    /**
     * 剖析結果的相關資訊
     */
    var MediaInfo = (function () {
        function MediaInfo() {
            /**
             * 媒體其他相關屬性
             */
            this.attributes = {};
        }
        /*
         * 取得深層副本
         */
        MediaInfo.prototype.clone = function () {
            var result = new MediaInfo();
            for (var key in result) {
                if (key == "attributes") {
                    for (var key2 in this[key])
                        result.attributes[key2] = this.attributes[key2];
                }
                else {
                    result[key] = this[key];
                }
            }
            return result;
        };
        return MediaInfo;
    }());
    MediaGet.MediaInfo = MediaInfo;
})(MediaGet || (MediaGet = {}));
//# sourceMappingURL=MediaInfo.js.map