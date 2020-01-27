const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PostSchema = new Schema({
  // user: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'users'
  // },
  // text: {
  //   type: String,
  //   required: true
  // },
  // name: {
  //   type: String
  // },
  // avatar: {
  //   type: String
  // },
  // likes: [
  //   {
  //     user: {
  //       type: Schema.Types.ObjectId,
  //       ref: 'users'
  //     }
  //   }
  // ],
  // comments: [
  //   {
  //     user: {
  //       type: Schema.Types.ObjectId,
  //       ref: 'users'
  //     },
  //     text: {
  //       type: String,
  //       required: true
  //     },
  //     name: {
  //       type: String
  //     },
  //     avatar: {
  //       type: String
  //     },
  //     date: {
  //       type: Date,
  //       default: Date.now
  //     }
  //   }
  // ],
  // date: {
  //   type: Date,
  //   default: Date.now
  // }

  // postnumber: {
  //   type: Number,
  //   required: true
  // },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    minlength: 10,
    maxlength: 300
  },
  commentsCount: {
    type: Number
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comments'
  }],
  createdAt: {
    type: String,
    required: true
  }
});

module.exports = Post = mongoose.model('posts', PostSchema);