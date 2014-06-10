var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.model('Vote', new Schema({
  // Vote option, should be 0~6
  vote: { type: Number, required: true },

  // Facebook ID
  fbid: { type: String, required: true, unique: true }
}));