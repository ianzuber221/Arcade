const { db, playerScores } = require('./db');

module.exports = {
  getFromDb: () => {
const findRsvpAndUpdate = (rsvpObj) => {
  return Rsvp.findOneAndUpdate(
    {firstName:rsvpObj.firstName, lastName: rsvpObj.lastName},
    rsvpObj,
    {upsert:true, useFindAndModify:false}
    )
};  },
  postFromDb: () => {
    console.log('postit');
  },
};
