var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/api/surveys', function(req, res, next) {
  res.send('response')
})
router.post('/api/surveys', function(req, res, next) {
  res.send('response')
})


module.exports = router;
