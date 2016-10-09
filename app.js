/*jshint node:true*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as it's web server
// for more info, see: http://expressjs.com
var express = require('express');
var log4js = require('log4js');
var bodyParser = require('body-parser');
var petSearch = require('./services/petSearch');
var https = require('https');
var fs = require('fs');
var request = require('request');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

//console log is loaded by default, so you won't normally need to do this
//log4js.loadAppender('console');
log4js.loadAppender('file');
//log4js.addAppender(log4js.appenders.console());
log4js.addAppender(log4js.appenders.file('logs/app.log'), 'app');

var logger = log4js.getLogger('app');
//The log level will be read from environment variable and replace the hardcode one
// logger.setLevel('DEBUG');
//
// logger.debug('Debug log entry');
// logger.info('Info log entry');
// logger.warn('Warn log entry');
// logger.error('Error log entry');

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
};
app.use(allowCrossDomain);

// database.initDBConnection();

//Uncomment the following as part of Lab exercise
//app.get('/findByTag', petSearch.findByTag);
app.get('/findById', petSearch.findById);

//Edits: Srinivas Cheemalapati Oct 05, 2016

app.get('/airport/status/:iata', petSearch.findStatus)
{
    console.log("got a get request for airport status");
};

app.listen(appEnv.port, appEnv.bind, function() {

  // print a message when the server starts listening
  logger.info("Server starting on " + appEnv.url);
});
