var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    name: String,
    created: {type: Date, deafult:Date.now}
});

var Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
