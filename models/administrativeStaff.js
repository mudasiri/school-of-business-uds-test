const mongoose = require('mongoose');

const administrativeStaffSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  position: { type: String },
  bio: { type: String },
  photo: { type: String }, // You can store the file path or image URL here
  phoneNumber: { type: String },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ['male', 'female'] },
});

const AdministrativeStaff = mongoose.model('AdministrativeStaff', administrativeStaffSchema);

module.exports = AdministrativeStaff;
