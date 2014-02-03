var mongoDal = require("../mongo-dal");

exports.addRoutes = function (app, config) {
    app.get('/api/meetings',
        function(req, res) {
            mongoDal.getMeetings(function(meetings) {
                res.json(meetings);
            });
    });

    app.post('/api/meetings', function(req, res) {
        if (req.body && req.body.name) {
            mongoDal.addMeeting(req.body.name);
            res.end('OK');
        }
        else{
            res.json({err: 'Invalid request'});
        }
    });
};