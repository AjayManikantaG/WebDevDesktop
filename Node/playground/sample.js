// const http = require('http');

// http.createServer(function(req, res) {
//     res.writeHead(200, {'content-type': 'text/html'});
//     res.write(req.url);
//     res.end();

// }).listen(8080);

const http = require('http');
const url = require('url');

http.createServer(function(req, res) {
    res.writeHead(200, {'content-type': 'text/html'});
    var q = url.parse(req.url, true).query;
    var text = q.year + " " + q.month;
    res.write(text);
    res.end();
}).listen(8000)
