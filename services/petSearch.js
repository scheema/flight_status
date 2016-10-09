//Declare logger
var log4js = require('log4js');
log4js.loadAppender('file');
log4js.addAppender(log4js.appenders.file('logs/service.log'), 'petSearch');
var logger = log4js.getLogger('petSearch');
var Promise = require('bluebird');
var request = Promise.promisify(require("request"));
var url = require('url');
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();

var clientSecret = 'G6xT5oB1aP0rN0oY3tS6aF2wA5gI8dM2lA7tF4iE5cK6mL4fK3';
var clientId = '24caccbd-1a07-4e88-8f21-240e03586a3b';
var apiBaseURL = 'https://api.apim.ibmcloud.com/banchasetthananau1ibmcom-dev/sb/petstore/v2';


// Edits: Srinivas 10072016
var faaClientSecret = 'B3fT0eI3bM3dS4eO5rL6xG3pP8vL8yT0jO6hQ8kH7oD0cE0sW7';
var faaClientId = '0605f6cd-3b05-4428-8ff4-83dbfea0be4a';
var statusBaseURL = 'https://api.us.apiconnect.ibmcloud.com/srinivausibmcom-bluemix-bootcamp/ctg-faa-status/airport';


var petstoreCreds = appEnv.getServiceCreds(/petstore/i);
if (petstoreCreds != null) {
  clientSecret = petstoreCreds.client_secret;
  clientId = petstoreCreds.client_id;
  apiBaseURL = petstoreCreds.url;
}


function ClientError(e) {
  return e.code >= 400 && e.code < 500;
};
//Implement findByTag module here. Hints: refer to findById
//You code goes here
//End of implementation

exports.findById = function(req, res) {
  //This can be replaced by VCAP_SERVICES and url from APIm
  var petAPIURL =
    apiBaseURL + '/pet/' +
    req.query.petId +
    '?client_id=' + clientId + '&client_secret=' + clientSecret;
    //Edits: Srinivas Cheemalapati 10/05/2016
    console.log(petAPIURL);

  logger.info("petAPIURL : " + petAPIURL);
  request(petAPIURL).then(function(contents) {
    var data = JSON.parse(contents[1]);
    return res.json(data);

  }).catch(ClientError, function(e) {
    //A client error like 400 Bad Request happened
  });
};

// Edits: Srinivsa 10/08/2016: Working code: Pass options including headers

exports.findStatus = function(req, res) {
  //This can be replaced by VCAP_SERVICES and url from APIm
    var options = {
        url : statusBaseURL + '/status/' +
        req.params.iata +
        '?format=' + req.query.format,
        method: 'GET', //Specify the method
        headers: { //We can define headers too
          'X-IBM-Client-Id':'0605f6cd-3b05-4428-8ff4-83dbfea0be4a',
          'X-IBM-Client-Secret':'B3fT0eI3bM3dS4eO5rL6xG3pP8vL8yT0jO6hQ8kH7oD0cE0sW7'
        }
    };
    //Edits: Srinivas Cheemalapati 10/05/2016
    console.log(statusBaseURL + '/status/' + req.params.iata + '?format=' + req.query.format);

  //logger.info("airportAPIURL : " + airportAPIURL);
    request(  options, function(error, response, body){
        if(error) {
        console.log(error);
        } else {
        var data = JSON.parse(body);
        return res.json(data);
        }
    })
};
