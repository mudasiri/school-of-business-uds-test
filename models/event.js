const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDetails: { type: String },
  venue: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  image: { type: String }, 
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;