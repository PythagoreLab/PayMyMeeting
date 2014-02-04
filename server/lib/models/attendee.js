var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var attendeeSchema = new Schema({
    name:  String,
    profileId: String,
    meetingId: String
});

var Attendee = mongoose.model('Attendee', attendeeSchema);

module.exports = Attendee;