var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var meetingSchema = new Schema({
    title:  String
});

var Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;