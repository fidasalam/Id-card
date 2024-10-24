// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  rollNo: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
  },
  profilePic: {  // Ensure this field is included in your schema
    type: String,
    required: true,  // This line indicates that profilePic is required
  },
});


const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
