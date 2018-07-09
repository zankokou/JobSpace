var express = require("express");

var router = express.Router();
var path = require('path')

var connection = require('../config/connection')

// Import the model (burger.js) to use its database functions.
var job = require("../models/job.js");

// Create all our routes and set up logic within those routes where required.
router.get("/jobs", function(req, res) {

  console.log('this is the __dirname!!!', __dirname);
  res.sendFile(path.join(__dirname, '../public/assets/', 'jobsScreen.html'));
});

router.get("/edit", function(req, res) {
  res.sendFile(path.join(__dirname, '../public/assets/', 'addScreen.html'));
});

router.post("/api/job", function(req, res) {
  job.insertOne([
    "company", "location", "title", "description",
    "company_link", "posting_link", "primary_contact_name",
    "primary_contact_position", "primary_contact_email",
    "primary_contact_phone", "salary", "notes", "stage"
  ], [
    req.body.company, req.body.location, req.body.title,
    req.body.description, req.body.company_link, req.body.posting_link,
    req.body.primary_contact_name, req.body.primary_contact_position,
    req.body.primary_contact_email, req.body.primary_contact_phone,
    req.body.salary, req.body.notes, req.body.stage
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.get("/api/job/:id", function(req, res) {
  job.findOne(req.params.id, function(jobData) {
      res.json(jobData);
    });
});



// router.get('/grabAllJobsFromDB', function(req,res) {
//   connection.query('SELECT * FROM JOBS').then(function(allJobsWeFound){
//     console.log('these are all the jobs we found!!!!', allJobsWeFound);
//   })
// })

module.exports = router;
