const mongoose = require('mongoose');

const loginSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        require: true,
        type: String,
    },
    mobileNumber: {
        type: Number,
        require: true,
        unique: true
    },
    approved : {
        type: Boolean,
        default: false
    },
    proctorClass: String,
    proctorDep : String,
    proctorDiv : String,
});

module.exports = mongoose.model("loginUser", loginSchema);