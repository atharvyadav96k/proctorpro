const mongoose = require('mongoose');
console.log(process.env.DATA_BASE_URL)
mongoose.connect(process.env.DATA_BASE_URL + '/proctorPro');


const StudentSchema = mongoose.Schema({
  name: String ,
  prlNumber: {
    type: Number,
    unique: true
  },
  rollNumber: Number,
  email: {
    type: String,
    unique: true
  },
  password: String,
  department: String,
  Class: String,
  div: String,
  phoneNumber: [
    {
      type: Number
    }
  ]
});

module.exports = mongoose.model("Student", StudentSchema);