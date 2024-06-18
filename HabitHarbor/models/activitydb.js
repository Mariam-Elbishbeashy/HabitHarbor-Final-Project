const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    duration: {
        type: Number,
        required: true
    },
    intensity: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Activitiesdb = mongoose.model('activitiesdb', activitySchema);

module.exports = Activitiesdb;