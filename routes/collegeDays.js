const mongoose = require('mongoose');

const collegeDaySchema =  mongoose.Schema({
    date: {
        type: Number,
        require: true
    }, 
    month: {
        type: Number,
        require: true
    },
    year: {
        type: Number,
        require: true
    },
    collegeDay : {
        type: String,
        unique: true,
        require: true
    }
});

module.exports = mongoose.model("collegeDay", collegeDaySchema);