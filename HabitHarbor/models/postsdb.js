const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    userName: {
      type: String,
      required: false,
    },
    userProfile: {
      type: String,
      required: false,
    },
    commentText: {
      type: String,
      required: true,
    },
  }, { timestamps: true });
  
const postSchema = new Schema({
  userName: {
    type: String,
    required: false,
  },
  userProfile: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: true,
  },
  imageUploaded:{
    type: String,
    required: false,
  },
  comments: [commentSchema],
 
}, { timestamps: true });

const Postdb = mongoose.model('postsdb', postSchema);

module.exports = Postdb;
