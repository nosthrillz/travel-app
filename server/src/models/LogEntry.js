const mongoose = require('mongoose');
const { Schema } = mongoose;

const requiredNumber = {
    type: Number,
    required:true
};

const logEntrySchema = new Schema({
    title: { 
        type: String,
        required: true,
    },
    description: String,
    comments: String,
    rating:  {
        type: Number,
        min: [1, 'Keep it between 1 and 10'],
        max: [10, 'Keep it between 1 and 10'],
        default: 5
    },
    image: String,
    latitude: {
        ...requiredNumber,
        min: -90,
        max: 90
    },
    longitude: {
        ...requiredNumber,
        min: -180,
        max: 180
    },
    visitDate: {
        type: Date,
        required: true,
    }
}, {
    timestamps: true,
});

const LogEntry = mongoose.model('LogEntry', logEntrySchema);

module.exports = LogEntry;