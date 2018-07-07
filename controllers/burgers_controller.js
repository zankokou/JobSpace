var express = require("express");

var router = express.Router();
var path = require('path')

var connection = require('../config/connection')

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/jobsScreen", function(req, res) {

  console.log('this is the __dirname!!!', __dirname);
  res.sendFile(path.join(__dirname, '../public/assets/', 'addScreen.html'));
});

router.get("/addAJob", function(req, res) {
  res.sendFile(path.join(__dirname, '../public/assets/', 'jobsScreen.html'));
});


// router.get('/grabAllJobsFromDB', function(req,res) {
//   connection.query('SELECT * FROM JOBS').then(function(allJobsWeFound){
//     console.log('these are all the jobs we found!!!!', allJobsWeFound);
//   })
// })

module.exports = router;
