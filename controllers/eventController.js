const Event = require('../models/event');
const multer = require('multer');
const path = require('path');


// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for uploaded images
    cb(null, 'public/images/blog/');
  },
  filename: function (req, file, cb) {
    // Set the filename for uploaded images (using the current timestamp)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  }
});

// Create a new multer upload instance
const upload = multer({ storage: storage });

// Create a new event
const createEvent = async (req, res) => {
  try {
    upload.fields([
      { name: 'image', maxCount: 1 }
    ])(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to upload images' });
      }

      // Get the uploaded file paths
      const image = req.files['image'][0].path;

      // Create a new lecturer object with the request body and the file paths
      const newEvent = new Event({
        ...req.body,
        image: image
      });

      // Save the new lecturer to the database
      const savedEvent = await newEvent.save();
      return savedEvent;
    });
    //const newEvent = new Event(req.body);
   // const savedEvent = await newEvent.save();
    //return savedEvent;
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
};

// Get recent Events
const getRecentEvents = async (req, res) => {
  try {
   const events = await Event.find().limit(3).sort({ startDate: 1 });
   return events;
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recent events' });
  }
}

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
    return updatedEvent;
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
  getRecentEvents,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById,
};