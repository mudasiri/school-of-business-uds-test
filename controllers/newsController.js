const News = require('../models/news');
const multer = require('multer');
const path = require('path');


// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder for uploaded images
    cb(null, 'public/images/product/');
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


// Create a new news
const createNews = async (req, res) => { 
  try {
    upload.fields([
      { name: 'featureImage', maxCount: 1 }
    ])(req, res, async function (err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to upload images' });
      }

      // Get the uploaded file paths
      const featureImage = req.files['featureImage'][0].path;

      // Create a new lecturer object with the request body and the file paths
      const newNews = new News({
        ...req.body,
        featureImage: featureImage
      });

      // Save the new lecturer to the database
      const savedNews = await newNews.save();
      return savedNews;
    });
    // const newNews = new News(req.body);
    // const savedNews = await newNews.save();
    // res.json(savedNews);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create news' });
  }
};

// Get All recent News

const getRecentNews = async (req, res) => {
  try {
    const news = await News.find().limit(3).sort({ publishedDate: -1 });
    return news;
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recent news' });

  }
}

// Get all news
const getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    return news;
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};

// Get a single news by ID
const getNewsById = async (req, res) => {
  try {
    const newsId = req.params.id;
    const news = await News.findById(newsId);
    if (!news) {
      return res.status(404).json({ error: 'News not found' });
    }
    return news;
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
};

// Update a news by ID
const updateNewsById = async (req, res) => {
  try {
    const newsId = req.params.id;
    const updatedNews = await News.findByIdAndUpdate(newsId, req.body, { new: true });
    if (!updatedNews) {
      return res.status(404).json({ error: 'News not found' });
    }
    return updatedNews
  } catch (error) {
    res.status(500).json({ error: 'Failed to update news' });
  }
};

// Delete a news by ID
const deleteNewsById = async (req, res) => {
  try {
    const newsId = req.params.id;
    const deletedNews = await News.findByIdAndDelete(newsId);
    if (!deletedNews) {
      return res.status(404).json({ error: 'News not found' });
    }
return deletedNews;
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete news' });
  }
};

module.exports = {
  createNews,
  getRecentNews,
  getAllNews,
  getNewsById,
  updateNewsById,
  deleteNewsById,
};