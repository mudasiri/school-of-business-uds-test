const mongoose = require('mongoose');

const lecturerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String },
  email: { type: String },
  title: { type: String },
  department: { type: String },
  city: { type: String },
  country: { type: String },
  bio: { type: String },
  linkedin: { type: String },
  researchgate: { type: String },
  pic: { type: String },
  coverPic: { type: String },
});

const Lecturer = mongoose.model('Lecturer', lecturerSchema);

module.exports = Lecturer;
