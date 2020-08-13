const mongoose = require('mongoose');
const dataEntitySchema = mongoose.Schema({
    filename: {
        type: String,
        required: true,
        min: 3
    },
    data: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('DataEntity', dataEntitySchema);