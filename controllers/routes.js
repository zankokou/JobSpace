var express = require("express");
var passport = require('passport');
var router = express.Router();
var path = require('path')

var connection = require('../config/connection')

// Import the model (job.js) to use its database functions.
var job = require("../models/job.js");
//=========================
router.get("/", function(req, res,next) {
  res.sendFile(path.join(__dirname, '../public/assets/', 'loginScreen.html'));
});

router.post('/',
passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/'
})
);


router.post('/', function(req,res,next) {
  pg.connect(connectionString, function(err, client){

    var query = client.query('INSERT INTO users (username, password) VALUES ($1, $2)', [request.body.username, request.body.password]);

    query.on('error', function(err){
      console.log(err);
    })

    query.on('end', function(){
      response.sendStatus(200);
      client.end();
    })

  })
});

// router.get('/', function(req, res, next) {
//   res.send(req.isAuthenticated());
// });

router.get('/', function(req, res, next) {
  res.send(req.isAuthenticated());
 });

//////////////////////////=========
router.get("/jobs", function(req, res) {
  res.sendFile(path.join(__dirname, '../public/assets/', 'jobsScreen.html'));
});

router.get("/edit", function(req, res) {
  res.sendFile(path.join(__dirname, '../public/assets/', 'addScreen.html'));
});

router.get("/edit/:id", function(req, res) {
  res.sendFile(path.join(__dirname, '../public/assets/', 'addScreen.html'));
});

router.get("/event", function(req, res) {
  res.sendFile(path.join(__dirname, '../public/assets/', 'eventScreen.html'));
});

router.get("/event/:id", function(req, res) {
  res.sendFile(path.join(__dirname, '../public/assets/', 'eventScreen.html'));
});

router.get("/account", function(req, res) {
  res.sendFile(path.join(__dirname, '../public/assets/', 'accountScreen.html'));
});


/****************
 * API ROUTES 
 ***************/

router.get("/api/jobs", function(req, res) {
  job.selectAll(function(data) {
    res.json(data);
  })
})

// post new job
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
    // send back the ID of new job
    res.json({ id: result.insertId });
  });
});

// update existing job
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
    // send back ID of updated job
    res.json({id: req.body.id});
  });
});

// get data for one job in jobs table
router.get("/api/job/:id", function(req, res) {
  job.findOne(req.params.id, function(jobData) {
      // send back job data from jobs table
      res.json(jobData);
    });
});

// post new event
router.post("/api/event", function(req, res) {
  job.insertEvent([
    "job_id", "event_time", "event_location", "name",
    "event_notes", "contact_name", "contact_position",
    "contact_email", "contact_phone"
  ], [
    req.body.job_id, req.body.event_time, req.body.location,
    req.body.name, req.body.notes, req.body.contact_name,
    req.body.contact_position, req.body.contact_email,
    req.body.contact_phone
  ], function(result) {
    // send back the ID of new event
    res.json({ id: result.insertId });
  });
});

// update existing event
router.put("/api/event", function(req, res) {
  var condition = "id = " + req.body.id;

  console.log("condition", condition);

  job.updateEvent({ 
    job_id: req.body.job_id, event_time: req.body.event_time, event_location: req.body.location,
    name: req.body.name, event_notes: req.body.notes, contact_name: req.body.contact_name,
    contact_position: req.body.contact_position, contact_email: req.body.contact_email,
    contact_phone: req.body.contact_phone
  }, condition, function(result) {
    // send back ID of updated job
    res.json({id: req.body.id});
  });
});

// get all events related to job
router.get(`/api/event/:id`, function(req, res) {
  job.findEvents(req.params.id, function(jobData) {
      // send back events data
      res.json(jobData);
    });
});

router.delete("/api/events/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  job.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// update existing job
router.put("/api/drag/:id", function(req, res) {
  var condition = "id = " + req.params.id;
 
  console.log("condition", condition);
 
  job.dragJob({
   stage: req.body.stage  
  }, condition, function(result) {
    // send back ID of updated job
    res.json({id: req.body.id});
  });
 });

// router.get('/grabAllJobsFromDB', function(req,res) {
//   connection.query('SELECT * FROM JOBS').then(function(allJobsWeFound){
//     console.log('these are all the jobs we found!!!!', allJobsWeFound);
//   })
// })

module.exports = router;
