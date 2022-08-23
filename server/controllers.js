const models = require('./models');
const { db, playerScores } = require('./db');

module.exports = {
  get: (req, res) => {
    playerScores.find()
    .then((response) => res.send(response));
  },
  post: (req, res) => {
    console.log(req.body);
    playerScores
      .findOneAndUpdate(
        { userId: req.body.userId, userEmail: req.body.userEmail },
        { $push: { scores: req.body.score } },
        { upsert: true, useFindAndModify: false }
      )
      .then((response) => res.send('Posted 🚀'))
      .catch((err) => console.log(err));
  },
};
