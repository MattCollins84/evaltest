var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var bodyParser = require('body-parser')

var routes = require('./routes/index.js');
var staff = require('./routes/staff.js');

var app = express();

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// body parser and paths
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// setup our routes
app.use('/', routes);
app.use('/staff', staff);

// port
app.set('port', 3000);

// error handler
app.use(function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  
  res.render('error', { 
    page: { 
      title: "Error" 
    } 
  });

  // here you can handle your error however you want

});

// 404
app.use(function missingHandler(req, res, next){
  
  res.status(404);

  res.render('404', { 
    page: { 
      title: "404" 
    } 
  });

});

// start our server
var server = http.createServer(app);
server.listen(3000);