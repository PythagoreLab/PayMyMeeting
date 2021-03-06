var mongoDal = require("../mongo-dal");
var socket = require("../socket").api;

var profiles = [
	{
		id: "0",
		name: "developer",
		cost: 450
	},
	{
		id: "1",
		name: "architect",
		cost: 800
	},
	{
		id: "2",
		name: "scrum master",
		cost: 600
	},
	{
		id: "3",
		name: "test manager",
		cost: 200
	},
	{
		id: "4",
		name: "salesman",
		cost: 800
	},
	{
		id: "4",
		name: "product owner",
		cost: 800
	}
]

exports.addRoutes = function (app, config) {
    app.get('/api/profiles',
        function(req, res) {
            // send notification
            socket.broadcastMessage("new attendee !!!");

            res.json(profiles);
    });
};