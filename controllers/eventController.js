const Event = require('../models/event');

// Create a new event
const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    return savedEvent;
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    return events;
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    return event;
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
};

// Update an event by ID
const updateEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedEvent = await Event.findByIdAndUpdate(eventId, req.body, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

// Delete an event by ID
const deleteEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    const deletedEvent = await Event.findByIdAndDelete(eventId);
    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }
    return deletedEvent;
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
};