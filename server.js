var express = require("express");
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 8080;
var app = express();

var path = require('path');

app.use('/public',express.static(path.join(__dirname + '/public')))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require("./controllers/burgers_controller.js");
app.use(routes);


console.log('test commit -scott');

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});
