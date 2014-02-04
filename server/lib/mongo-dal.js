var mongoose = require('mongoose');
var Meeting = mongoose.model('Meeting');
var Attendee = mongoose.model('Attendee');

module.exports = {
    // open a connection to the DB using Mongoose
    connect: function(path) {
        console.log("Opening Mongoose connection to " + path);
        mongoose.connect(path);
    
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function callback () {
            console.log("Mongoose connection opened successfuly");
        });
    },

    // add a new meeting
    addMeeting: function(name) {
        var mongoMeeting = new Meeting({title: name});
        mongoMeeting.save(function(err, element) {
            if (err)
                console.log("Error while saving element " + JSON.stringify(element) + " : " + err);
        });
    },

    // fetch all meetings
    getMeetings: function(callback) {
        Meeting.find({}, function(err, elements) {
            if (err)
                console.log("Error while fetching meetings " + err);

            var meetings = [];
            for(var i = 0; i < elements.length; i++){
                meetings.push({
                    id: elements[i]._id, 
                    title: elements[i].title}
                );
            }

            callback(meetings);
        });
    },

    // add a new attendee
    addAttendee: function(name, profileId, meetingId) {
        var mongoAttendee = new Attendee({name: name, profileId: profileId, meetingId: meetingId});
        mongoAttendee.save(function(err, element) {
            if (err)
                console.log("Error while saving element " + JSON.stringify(element) + " : " + err);
        });
    },

    // fetch all attendees
    getAttendees: function(meetingId, callback){
        var filter = {};
        if (meetingId){
            filter = { meetingId: meetingId};
        }

        Attendee.find(filter, function(err, elements) {
            if (err)
                console.log("Error while fetching attendees " + err);

            callback(elements);
        });
    }
}