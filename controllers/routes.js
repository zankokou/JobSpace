var express = require("express");

var router = express.Router();
var path = require('path')

var connection = require('../config/connection')

// Import the model (burger.js) to use its database functions.
var job = require("../models/job.js");

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, '../public/assets/', 'loginScreen.html'));
});

router.get("/jobs", function(req, res) {
  res.sendFile(path.join(__dirname, '../public/assets/', 'jobsScreen.html'));
});

router.get("/edit", function(req, res) {
  res.sendFile(path.join(__dirname, '../public/assets/', 'addScreen.html'));
});

router.get("/edit/:id", function(req, res) {
  res.sendFile(path.join(__dirname, '../public/assets/', 'addScreen.html'));
});


/****************
 * API ROUTES 
 ***************/

// router.get('/api/job')
router.get("/api/jobs", function(req, res) {
  job.selectAll(function(data) {
    res.json(data);
  })
})

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

// Create router.put function for update one
router.put("/api/job/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  job.updateOne({ 
    company: req.body.company, location: req.body.location, title: req.body.title,
    description: req.body.description, company_link: req.body.company_link, posting_link: req.body.posting_link,
    primary_contact_name: req.body.primary_contact_name, primary_contact_position: req.body.primary_contact_position,
    primary_contact_email: req.body.primary_contact_email, primary_contact_phone: req.body.primary_contact_phone,
    salary: req.body.salary, notes: req.body.notes, stage: req.body.stage  
  }, condition, function(result) {
    // if (result.changedRows == 0) {
    //   // If no rows were changed, then the ID must not exist, so 404
    //   return res.status(404).end();
    // } else {
      res.status(200).end();
    // }
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
