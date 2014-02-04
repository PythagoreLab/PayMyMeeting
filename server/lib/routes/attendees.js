var mongoDal = require("../mongo-dal");
var socket = require("../socket");

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

            // send notification
            socket.broadcastMessage("new attendee !!!");

            res.end('OK');
        }
        else{
            res.json({err: 'Invalid request'});
        }
    });
};