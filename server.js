var express = require("express");
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 8080;
var app = express();

var path = require('path');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require("./controllers/routes");
app.use(routes);


app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});


console.log('here is my branch console log.')