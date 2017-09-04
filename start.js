var http = require('http');

function start(route, handle) {
  function onRequest(request, response) {

    console.log('request received.');
    response.writeHead(200, {"Content-Type":                          
      "text/plain"});
    response.write('Starting point.');
    response.end();
  }

http.createServer(onRequest).listen(3214);
console.log("Server has started.");
}

exports.start = start;