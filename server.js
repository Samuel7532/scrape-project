var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// Require all models
// var db = require("./models");

var PORT = process.env.PORT || 3000;
var Articles = require("./models/articles.js");
var Comments = require("./models/notes.js");
var routes = require("./controllers/articlecontroller.js");
mongoose.Promise = Promise;
// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/articledb");
var db = mongoose.connection;
db.on("error", function(error){
  console.log(error);
});
db.once("open", function(){
  console.log("Mongoose connection sucessful!");
});
// Routes
app.use("/", routes);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
