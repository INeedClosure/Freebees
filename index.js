var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

var app = express();

mongoURI = process.env.MONGOLAB_URI || "mongodb://localhost/freebiesnearme";
//to connect to local mongodb
mongoose.connect(mongoURI);

// to directly post to the remote online database, use this connection:
// mongoose.connect("mongodb://master:master@ds061405.mongolab.com:61405/heroku_477ltgkh");

mongoose.connection.once('open', function(){
  console.log('Connected to mongodb');
});

var port = process.env.PORT || 3000;

//set up server logging
app.use(morgan('dev'));

app.use(bodyParser.json());
//parse x-ww-form-urlencoded encoded req bodies
app.use(bodyParser.urlencoded({extended: true}));

//use routes.js
app.use(express.static(__dirname + '/client'));
require('./server/routes')(app);

app.listen(port);
console.log('Express is listening on port: ' + port);

module.exports = app;
