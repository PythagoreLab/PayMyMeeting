var mongoDal = require("../mongo-dal");

exports.addRoutes = function (app, config) {
    app.get('/api/attendees',
        function(req, res) {
            mongoDal.getAttendees(undefined, function(attendees) {
                res.json(attendees);
            });
    });

    app.get('/api/attendees/:meetingId',
        function(req, res) {
            mongoDal.getAttendees(req.params.meetingId, function(attendees) {
                res.json(attendees);
            });
    });

    app.post('/api/attendees', function(req, res) {
        if (req.body && req.body.name && req.body.profileId && req.body.meetingId) {
            mongoDal.addAttendee(req.body.name, req.body.profileId, req.body.meetingId);
            res.end('OK');
        }
        else{
            res.json({err: 'Invalid request'});
        }
    });
};