const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const InboxSchema = new Schema({
  // inbocId: {
  //   type: Number
  // },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'posts'
  }]
});

module.exports = Inbox = mongoose.model('Inboxs', InboxSchema);