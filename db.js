const mongoose = require('mongoose');

//const dbUrl = 'mongodb://127.0.0.1:27017/udssob';
const dbUrl = 'mongodb+srv://danladi496:CsDqahuwW4Lrkl6L@cluster0.genmgzy.mongodb.net';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

