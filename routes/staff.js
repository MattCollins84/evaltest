var express = require('express');
var router = express.Router();
var staff = require('../lib/staff.js');

// render staff list
router.get('/list', function renderStaffList(req, res, next) {
  
  var data = { 
    page: { 
      title: "Technical Test - Staff List" 
    }, 
    staff: require('../data/db.json')
  }

  res.render('list', data);

});

// do staff edit
router.post('/edit', function doStaffEdit(req, res, next) {
  
  staff.edit(req.body, function staffEdit(err, data) {

    res.setHeader('Content-Type', 'application/json');

    // error?
    if (err) {
      return res.send(JSON.stringify({ success: false, error: err }, null, 2));
    }

    // success!
    return res.send(JSON.stringify({ success: true }, null, 2));

  });

});

// render new staff
router.get('/new', function renderNewStaff(req, res, next) {
  
  var data = { 
    page: { 
      title: "Technical Test - New Staff" 
    }
  }

  res.render('new', data);

});

// do new staff
router.post('/add', function(req, res, next) {
  
  staff.add(req.body, function doStaffAdd(err, data) {

    res.setHeader('Content-Type', 'application/json');

    // error?
    if (err) {
      return res.send(JSON.stringify({ success: false, error: err }, null, 2));
    }

    // success!
    return res.send(JSON.stringify({ success: true }, null, 2));

  });

});

module.exports = router;