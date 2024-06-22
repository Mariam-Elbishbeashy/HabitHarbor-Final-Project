const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const customSchema = new Schema({
  Type: {
    type: String,
    required: false,
  },
  Title: {
    type: String,
    required: false,
  },
  Content: {
    type: String,
    required: false,
  },
  Done: {  //for daily activities
    type: Boolean,
    required: false,
  },
  Progress: { //for weekely & monthly activities
    type: Number,
    required: false,
  },
  daysOfProgress: {
    type: Number,
    required: false,
  }
}, { timestamps: true });

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
  customChallenge: [customSchema],

  activities: [{
    type: Schema.Types.ObjectId,
    ref: 'activitiesdb'
  }],
  country: {
    type: String,
    required: false,
  },
  health_issues: {
    type: String,
    required: false,
  },
  goals: {
    type: [String], 
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
  feedback: {
    type: String,
    required: false,
  },
}, { timestamps: true });

const Userdb = mongoose.model('userdb', userSchema);

module.exports = Userdb;
