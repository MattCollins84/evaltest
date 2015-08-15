var express = require('express');
var router = express.Router();

// homepage
router.get('/', function homepage(req, res, next) {
  
  var data = { 
    page: {
      title: "Technical Test"
    }
  }

  res.render('index', data);

});

// trigger error handler
router.get('/fail', function fail(req, res, next) {
  
  // bad code
  a = b;

});

module.exports = router;