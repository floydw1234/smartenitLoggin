var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require("request-promise");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/west');
var Schema = mongoose.Schema;


var index = require('./routes/index');
var users = require('./routes/users');

//one({"type": "hrlyaverage", "value": numpy.average(hourValues), "timeStamp" : hourLimit})

var avgS = new Schema({
    type: String,
    value: Number,
    timeStamp: Number
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');




// error handler
app.get("/", function(req,res){
	res.sendfile('public/index.html');
});

app.get("/averages", function(req,res){
	var array = [];
	var avg = mongoose.model('average', avgS, 'averages');
		avg.find().exec(function(err,avgs){
			avgs.forEach(function(thing){
				array.push(thing);
					
			});
			res.send(array);
		});
});

module.exports = app;
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
