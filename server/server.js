var express = require('express');
var http = require('http');

var config = require('./config.js');
var xsrf = require('./lib/xsrf');

var Meeting = require('./lib/models/meeting');

var app = express();
var server = http.createServer(app);

require('./lib/routes/static').addRoutes(app, config);

app.use(express.logger());
app.use(express.bodyParser()); 

app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

var mongoDal = require('./lib/mongo-dal');
mongoDal.connect(config.mongo.dbPath);

require('./lib/routes/meetings').addRoutes(app, config);

server.listen(config.server.listenPort, '0.0.0.0', 511, function() {
  /*var open = require('open');
  open('http://localhost:' + config.server.listenPort + '/');*/
});

console.log('Server ready - listening on port: ' + config.server.listenPort);