var mediaget = require('./mediaget.js').MediaGet;
var x = new mediaget.Extractors.XuiteExtractor();
var y = new mediaget.Extractors.YoutubeExtractor();

x.getMediaInfosAsync('http://vlog.xuite.net/play/WXRvQVUzLTU2MTQwNy5mbHY=').then(function (x) {
    console.log(x);

    y.getMediaInfosAsync('https://www.youtube.com/watch?v=GFDPZx9u_ns&list=RDGFDPZx9u_ns').then(function (x) {
        console.log(x);
    }).catch(function (x) {
        console.log(x);
    })
}).catch(function (x) {
    console.log(x);
});


//# sourceMappingURL=main.js.map