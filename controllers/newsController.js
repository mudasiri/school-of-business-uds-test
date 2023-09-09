const News = require('../models/news');

// Create a new news
const createNews = async (req, res) => {
  try {
    const newNews = new News(req.body);
    const savedNews = await newNews.save();
    res.json(savedNews);
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
    res.json(news);
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
    res.json(news);
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
    res.json(updatedNews);
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
    res.json({ message: 'News deleted successfully' });
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