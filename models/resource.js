var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var resourceSchema = new Schema({
    uri: Number,
    name: String,
    date: {
      type: Date,
      default: Date.now
    },
    desc: String,
    files: {
      type: Array,
      default: []
    },
});

exports.Resource = mongoose.model('resource', resourceSchema);