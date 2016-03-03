var MediaGet;
(function (MediaGet) {
    /**
     * 剖析結果的相關資訊
     */
    class MediaInfo {
        constructor() {
            /**
             * 媒體其他相關屬性
             */
            this.attributes = {};
        }
        /*
         * 取得深層副本
         */
        clone() {
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
        }
        ;
    }
    MediaGet.MediaInfo = MediaInfo;
})(MediaGet || (MediaGet = {}));
//# sourceMappingURL=MediaInfo.js.map