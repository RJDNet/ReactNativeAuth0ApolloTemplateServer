const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CommentSchema = new Schema({
  // id: {
  //   type: String
  // },
  text: {
    type: String
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'posts'
  }
});

module.exports = Comment = mongoose.model('comments', CommentSchema);