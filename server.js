var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

//Define port 8080
var PORT = process.env.PORT || 8080;

// Initialize handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadLines";
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true , useUnifiedTopology: true });

// Start the server listener
app.listen(PORT, function() {
    console.log("🌎 App running on port " + PORT + "!");
  });

  // "/" Route