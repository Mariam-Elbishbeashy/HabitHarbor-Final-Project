const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const resourceSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
  Paragraph: {
    type: String,
    required: true,
  },
  URL:{
    type: String,
    required: true,
  },
  Category:{
    type: String,
    required: true,
  },
}, { timestamps: true });

const Resourcedb = mongoose.model('resourcesdb', resourceSchema);

module.exports = Resourcedb;
