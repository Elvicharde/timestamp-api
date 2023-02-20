// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require("dotenv").config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// endpoint for posting date 
app.get("/api/:date/", Handler).post("/api/:date/", Handler);

//endpoint for handling no input as well
app.get("/api", Handler2).post("/api", Handler2);

function Handler(req, res){
  let date = req.params.date;

  // for non empty dates
  if (!/-/.test(date)){
    date = +date    // converting to integer if date is in unix timestamp format
  }
  let utcDate = new Date(date)


// Date validation: invalid date
  if (isNaN(utcDate.valueOf())){
    return res.json({ error : "Invalid Date" })
  }

// Otherwise
  let unixTime = Date.parse(utcDate);
  let respObj = {"unix":+`${unixTime}`, "utc":`${utcDate.toUTCString()}`}
  res.json(respObj);
};

function Handler2(_, res){
  let currTime = new Date();
  res.json({"unix":+`${Date.parse(currTime)}`, "utc":`${currTime.toUTCString()}`})
}


PORT = process.env.PORT || 3000

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
