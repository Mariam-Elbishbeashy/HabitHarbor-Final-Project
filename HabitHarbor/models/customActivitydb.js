const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Content: {
    type: String,
    required: true,
  }
});

const Custom = mongoose.model('Custom', customeSchema);

module.exports = Custom;