const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SavedPostSchema = new Schema({
  post: {
    type: Schema.Types.ObjectId,
    ref: 'posts'
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: 'comments'
  },
  lastCount: {
    type: Number
  },
  currentCount: {
    type: Number
  }
});

module.exports = SavedPost = mongoose.model('SavedPosts', SavedPostSchema);