import Extractors = MediaGet.Extractors;
module MediaGet {
    export var matchRegex = {
        [<any>Extractors.YoutubeExtractor]: /http(s)?:\/\/www.youtube.com\/watch\?v=.+/
    };

}