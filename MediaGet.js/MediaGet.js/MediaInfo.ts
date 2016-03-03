module MediaGet {    
    /**
     * 剖析結果的相關資訊
     */
    export class MediaInfo {
        /**
         * 媒體的名稱或標題
         */
        public name: string;

        /**
         * 媒體類型
         */
        public type: MediaTypes;

        /**
         * 媒體來源網址
         */
        public sourceUrl: URL;

        /**
         * 媒體真實位址
         */
        public realUrl: URL;

        /**
         * 媒體長度(秒)
         */
        public duration: number;

        /**
         * 媒體敘述
         */
        public description: string;

        /**
         * 影片縮圖網址
         */
        public thumbnail: URL;

        /**
         * 剖析結果來源類型
         */
        public extractorConstructor: Function;

        /**
         * 媒體其他相關屬性
         */
        public attributes: Object = {};

        /*
         * 取得深層副本
         */
        public clone(): MediaInfo {
            var result = new MediaInfo();
            for (var key in result) {
                if (key == "attributes") {
                    for (var key2 in this[key]) result.attributes[key2] = this.attributes[key2];
                } else {
                    result[key] = this[key];
                }
            }
            return result;
        };
    }
}