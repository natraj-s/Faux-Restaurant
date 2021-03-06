// Dependencies 
//
var http = require("http");
var PORT = 3000;
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

app = express();

var reservations =[
  {
  name: "",
  phoneNumber: "",
  email: "",
  uniqueId: "",
},

{
name: "",
phoneNumber: "",
email: "",
uniqueId: "",
}];

// Routes
// 

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/newreservation", function(req, res) {
  res.sendFile(path.join(__dirname, "addreservation.html"));
});

// Get all reservations
app.get("/allreservations", function(req, res) {
  res.json(reservations);
});

// Search for reservation - provides JSON
app.get("/api/:reservations?", function(req, res) {
  var chosen = req.params.reservations;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < reservations.length; i++) {
      if (chosen === reservations[i].routeName) {
        return res.json(reservations[i]);
      }
    }
    return res.json(false);
  }
  return res.json(reservations);
});

// Create New Reservations - takes in JSON input
app.post("/api/newreservation", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newreservation = req.body;
  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();

  // console.log(newresevervation);

  reservations.push(newreservation);

  res.json(newreservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});