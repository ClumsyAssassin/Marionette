var http = require('http'); 
var express = require('express');
var ejs = require('ejs');
var app = express();

app.use('/public', express.static(__dirname +  '/public'));

app.set('views', __dirname);
app.engine('html', ejs.renderFile);

app.get('/', function(req, res){
	res.render('public/index.html');
});

app.get('/logviewer', function(req, res){
	res.render('public/logviewer.html');
});

app.listen(1337);