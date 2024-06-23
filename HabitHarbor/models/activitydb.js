const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customSchema = new Schema ( {
Title: {
    type: String, 
    required: false,
},
Content: {
    type: String,
    required: false,
},
Done: { //for daily activities
    type: Boolean,
    required: false,
},
Progress: { //for weekely & monthly activities 
    type: Number, 
    required: false,
},
}, { timestamps: true });
const activitySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    ageRange: {
        min: {type: Number, required: true},
        max: {type: Number, required: true}
    },
    bmiRange: {
        min: {type: Number, required: true},
        max: {type: Number, required: true}
    },
    intensity: {
        type: String,
        required: true
    },
    customChallenge: [customSchema],
}, { timestamps: true });

const Activitiesdb = mongoose.model('activitiesdb', activitySchema);

module.exports = Activitiesdb;