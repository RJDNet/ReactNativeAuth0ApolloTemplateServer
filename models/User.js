const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  // username: {
  //   type: String,
  //   required: true
  // },
  // email: {
  //   type: String,
  //   required: true
  // },
  // password: {
  //   type: String,
  //   required: true
  // },
  // avatar: {
  //   type: String
  // },
  // date: {
  //   type: Date,
  //   default: Date.now
  // }


  userId: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    minlength: 3,
    maxlength: 30
  },
  avatar: {
    type: String
  },
  // posts: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'post'
  // }],
  inbox: {
    type: Schema.Types.ObjectId,
    ref: 'inbox'
  }
});

module.exports = User = mongoose.model('users', UserSchema);