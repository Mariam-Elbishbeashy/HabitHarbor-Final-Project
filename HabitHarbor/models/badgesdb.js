const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const badgeSchema = new Schema({
    badgeTitle: {
      type: String,
      required: true,
    },
    badgeImage: {
      type: String,
      required: true,
    },
    badgeCategory:{
      type: String,
      required: true,
    },
    badgeType: { 
      type: String, 
      required: true 
    }
  }, { timestamps: true });
  
  const Badgesdb = mongoose.model('badgesdb', badgeSchema);
  
  module.exports = Badgesdb;
  