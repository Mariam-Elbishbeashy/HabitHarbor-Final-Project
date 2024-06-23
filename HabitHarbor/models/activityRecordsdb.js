const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activityRecordsSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    habitContent: {
        type: String,
        required: true
    },
    habitCategory: {
        type: String,
        required: true
    },
    dayOfCompletion: {
        type: Number,
        required: true
    },
    monthOfCompletion: {
        type: Number,
        required: true
    }
});

const ActivityRecordsdb = mongoose.model('activityRecordsdb', activityRecordsSchema);

module.exports = ActivityRecordsdb;