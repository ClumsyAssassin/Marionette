var logData = {
	"total" : 10,
	"logs": [
		{
			"id": 1,
			"environment": "robert",
			"application": "App1",
			"lineCount": 50,
			"dateCreated": "2013-01-01 10:00:00"
		}, {
			"id": 2,
			"environment": "robert",
			"application": "App5",
			"lineCount": 40,
			"dateCreated": "2013-01-01 10:00:00"
		}, {
			"id": 3,
			"environment": "robert",
			"application": "App1",
			"lineCount": 10,
			"dateCreated": "2013-01-01 10:00:00"
		}, {
			"id": 4,
			"environment": "robert",
			"application": "App1",
			"lineCount": 10,
			"dateCreated": "2013-01-01 10:00:00"
		}, {
			"id": 5,
			"environment": "robert",
			"application": "App1",
			"lineCount": 10,
			"dateCreated": "2013-01-01 10:00:00"
		}, {
			"id": 6,
			"environment": "robert",
			"application": "App1",
			"lineCount": 10,
			"dateCreated": "2013-01-01 10:00:00"
		}, {
			"id": 7,
			"environment": "robert",
			"application": "App1",
			"lineCount": 10,
			"dateCreated": "2013-01-01 10:00:00"
		}, {
			"id": 8,
			"environment": "robert",
			"application": "App1",
			"lineCount": 10,
			"dateCreated": "2013-01-01 10:00:00"
		}, {
			"id": 9,
			"environment": "robert",
			"application": "App1",
			"lineCount": 10,
			"dateCreated": "2013-01-01 10:00:00"
		}, {
			"id": 10,
			"environment": "robert",
			"application": "App1",
			"lineCount": 10,
			"dateCreated": "2013-01-01 10:00:00"
		}
	]
};




var http = require('http');
var express = require('express');
var ejs = require('ejs');
var app = express();
var fs = require('fs');

app.use('/public', express.static(__dirname + '/public'));

app.set('views', __dirname);
app.engine('html', ejs.renderFile);

app.get('/', function(req, res) {
	res.render('public/index.html');
});

app.get('/logviewer', function(req, res) {
	res.sendfile('public/logviewer.html');
});

app.get('/request/log', function(req, res) {
	var returnData = {
		logs: []
	};
	
	var start = req.query.perPage * (req.query.page - 1);
	var end = ((start + parseInt(req.query.perPage)) > logData.logs.length) ? logData.logs.length : (start + parseInt(req.query.perPage));
	
	console.log("start: %d, end: %d", start, end);
	
	for(var i = start; i < end; i++) {
		returnData.logs.push(logData.logs[i]);
	}
	
	if(req.query.getCount == "true") {
		returnData.total = logData.total;
	}

	res.type('application/json');
	res.send(returnData);
});

app.get('/file/log', function(req, res) {
	res.type('application/json');
	res.sendfile('public/data/filelogs.json');
});

app.get('/environment', function(req, res) {
	res.type('application/json');
	res.sendfile('public/data/environments.json');
});

app.listen(1337);
