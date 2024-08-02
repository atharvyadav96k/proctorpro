const mongoose = require('mongoose');
mongoose.connect(process.env.DATA_BASE_URL);


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