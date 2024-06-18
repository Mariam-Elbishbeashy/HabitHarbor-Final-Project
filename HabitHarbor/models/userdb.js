const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  DataType:{
    type:String,
    required:true,
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
  DateofBirth: {
    type: String,
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
    required: true,
  }
}, { timestamps: true });

const Userdb = mongoose.model('userdb', userSchema);

module.exports = Userdb;
