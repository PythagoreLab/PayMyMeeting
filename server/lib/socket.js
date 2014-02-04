var sockjs = require('sockjs');

var endpoint = sockjs.createServer();

var clients = [];

endpoint.on('connection', function(conn) {
	console.log('SOCKET new socket connection received !');
	clients.push(conn);
});

exports.api = {
	registerServer: function (server, prefix){
		console.log("SOCKET setting up socket endpoint at " + prefix);
		endpoint.installHandlers(server, { prefix: prefix });	
	},
	broadcastMessage: function(message){
		console.log('SOCKET sending message ' + message + ' to ' + clients.length + ' clients')
		for(var i = 0; i < clients.length; i++){
			clients[i].write(message);
		}
	}
};