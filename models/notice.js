var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noticeSchema = new Schema({
    uri: Number,
    name: String,
    date: {
      type: Date,
      default: Date.now
    },
    content: String,
    files: {
      type: Array,
      default: []
    },
});

exports.Notice = mongoose.model('notice', noticeSchema);