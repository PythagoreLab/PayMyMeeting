var mongoose = require('mongoose');
var Meeting = mongoose.model('Meeting');

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

            callback(elements);
        });
    }
}