var express = require("express");
var mongoose = require("mongoose");

var PORT = 8080;

// Require all models
//var db = require("./models");

// Initialize Express
var app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

require("./routes/html-routes.js")(app);
//require("./routes/user-api-routes.js")(app);

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/mongoHeadlines", { useNewUrlParser: true });

// Start the server
app.listen(PORT, function() {
    console.log("🌎 App running on port " + PORT + "!");
  });