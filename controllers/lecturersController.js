const Lecturer = require('../models/lecturer');
const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for uploaded images
    cb(null, 'public/images/team/');
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

// Create a new lecturer
const createLecturer = async (req, res) => {
  try {
    // Using the upload middleware to handle the file uploads
    upload.fields([
      { name: 'pic', maxCount: 1 },
      { name: 'coverPic', maxCount: 1 }
    ])(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to upload images' });
      }

      // Get the uploaded file paths
      const profilePicPath = req.files['pic'][0].path;
      const coverPicPath = req.files['coverPic'][0].path;

      // Create a new lecturer object with the request body and the file paths
      const newLecturer = new Lecturer({
        ...req.body,
        pic: profilePicPath,
        coverPic: coverPicPath
      });

      // Save the new lecturer to the database
      const savedLecturer = await newLecturer.save();
      return savedLecturer;
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create lecturer' });
  }
};

// Get all lecturers
const getAllLecturers = async (req, res) => {
  try {
    const lecturers = await Lecturer.find();
    return lecturers;
  } catch (error) {
    throw new Error('Failed to get lecturers');  }
};

// Get a specific lecturer by ID
const getLecturerById = async (req, res) => {
  try {
    const lecturer = await Lecturer.findById(req.params.id);
    console.log(lecturer);
    if (!lecturer) {
      return res.status(404).json({ message: 'Lecturer not found' });
    }
    return lecturer;
  } catch (error) {
    res.status(500).json({ error: 'Failed to get lecturer' });
  }
};

// Update a lecturer by ID
const updateLecturerById = async (req, res) => {
  try {
    const updatedLecturer = await Lecturer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLecturer) {
      return res.status(404).json({ message: 'Lecturer not found' });
    }
    //res.json(updatedLecturer);
    return updatedLecturer;
  } catch (error) {
    res.status(500).json({ error: 'Failed to update lecturer' });
  }
};

// Delete a lecturer by ID
const deleteLecturerById = async (req, res) => {
  try {
    const deletedLecturer = await Lecturer.findByIdAndRemove(req.params.id);
    if (!deletedLecturer) {
      return res.status(404).json({ message: 'Lecturer not found' });
    }
    //res.json(deletedLecturer);
    return deletedLecturer;
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete lecturer' });
  }
};

module.exports = {
  createLecturer,
  getAllLecturers,
  getLecturerById,
  updateLecturerById,
  deleteLecturerById,
};