const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  details: { type: String },
  category: { type: String },
  publishedDate: { type: Date, required: true },
  featureImage: { type: String }, // You can store the file path or image URL here
});

const News = mongoose.model('News', newsSchema);

module.exports = News;