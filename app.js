var express = require("express");
var app = express();
var bodyParser  = require("body-parser");
var path = require('path');
var partials = require('express-partials');

var routes = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.listen(4000, function() {
  console.log("Node client running on http://localhost:4000");
});

module.exports = app;