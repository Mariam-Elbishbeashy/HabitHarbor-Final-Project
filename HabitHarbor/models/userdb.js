const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  DataType: {
    type: String,
    required: false,
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
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
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
  country: {
    type: String, // Adjust the type based on your needs (e.g., enum for limited options)
    required: false,
  },
  health_issues: {
    type: String,
    required: false,
  },
  goals: {
    type: [String], // Assuming multiple values are stored as an array of strings
    required: false,
  },
  facebook: {
    type: String,
    required: false,
  },
  instagram: {
    type: String,
    required: false,
  },
  twitter: {
    type: String,
    required: false,
  },
  linkedin: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const Userdb = mongoose.model('userdb', userSchema);

module.exports = Userdb;
