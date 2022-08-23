const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/arcade');

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const playerScoresSchema = mongoose.Schema({
  userEmail: String,
  userId: String,
  scores: [Number],
});

const playerScores = mongoose.model('playerScores', playerScoresSchema);

module.exports = { db, playerScores };
