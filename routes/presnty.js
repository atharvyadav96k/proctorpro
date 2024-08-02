const mongoose = require('mongoose');

const presentSchema = mongoose.Schema({
    studentId: {
        type:  mongoose.Schema.Types.ObjectId, 
        ref: 'Student'
    },
    year: Number,
    month: Number,
    date: Number,
    lecture : String,
    Class: String,
    department: String,
    div: String,
    status: Boolean
});

module.exports = mongoose.model("present", presentSchema);