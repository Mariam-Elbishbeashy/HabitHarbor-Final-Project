const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const customSchema = new Schema({
  Title: {
    type: String,
    required: false,
  },
  Content: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const userSchema = new Schema({
  DataType:{
    type:String,
    required:false,
  },
  Firstname: {
    type: String,
    required: true,
  },
  Lastname: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique:true,
  },
  phone: {
    type: String,
    required: true,
    unique:true,
  },
  age: {
    type: Number,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  Weight: {
    type: Number,
    required: true,
  },
  Height: {
    type: Number,
    required: true,
  },
  Username: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: false,
  },
  customChallenge: [customSchema],
  
}, { timestamps: true });

const Userdb = mongoose.model('userdb', userSchema);

module.exports = Userdb;
