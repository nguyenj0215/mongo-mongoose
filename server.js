var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
var db = require("./models");

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
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Start the server listener
app.listen(PORT, function () {
  console.log("🌎 App running on port " + PORT + "!");
});

// "/" route
// A GET route for scraping the echoJS website
app.get("/", function (req, res) {
  // First, we grab the body of the html with axios
  axios.get("http://www.echojs.com/")
    .then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Now, we grab every h2 within an article tag, and do the following:
      $("article h2").each(function (i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function (dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          //Catch any errors that occur
          .catch(function (error) {
            console.log(error);
          });
      });
      console.log("Scrape complete")
    });
  //After scrape print articles to page
  db.Article
    .find({})
    .then(function (dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.render("index", {articles : dbArticle});
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});
