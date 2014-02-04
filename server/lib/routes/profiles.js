var mongoDal = require("../mongo-dal");

var profiles = [
	{
		id: 0,
		name: "developer",
		cost: 450
	},
	{
		id: 1,
		name: "architect",
		cost: 800
	},
	{
		id: 2,
		name: "scrum master",
		cost: 600
	}
]

exports.addRoutes = function (app, config) {
    app.get('/api/profiles',
        function(req, res) {
            res.json(profiles);
    });
};