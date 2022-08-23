var controller = require('./controllers');
var router = require('express').Router();

router.get('/scores', controller.get);

router.post('/scores', controller.post);

module.exports = router;
