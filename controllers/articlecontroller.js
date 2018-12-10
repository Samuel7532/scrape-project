// Dependencies
var express = require("express");
var cheerio = require("cheerio");
var axios = require("axios");
var mongoose = require("mongoose");

var Articles = require("../models/articles.js");
var Notes = require("../models/notes.js");

var router = express.Router();

// A GET route for scraping the echoJS website
router.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("http://www.npr.org/sections/news/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
        
        var results = [];
  
    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works
    $(".item.has-image").each(function(i, element) {
  
      var title = $(element).children(".item-info").find("h2.title").text();
      var summary = $(element).children(".item-info").find("p.teaser").text();
      var link = $(element).children(".item-info").find("h2.title").find("a").attr("href");
        console.log(title);
        console.log(summary);
        console.log(link);
      // Save these results in an object that we'll push into the results array we defined earlier
      results.push({
        title: title,
        summary: summary,
        link: link,
      });
    });
        
    for(var i = 0; i < results.length; i++){
        Articles.create(results[i])
        .then(function(data){
            res.redirect("/articles");
        });
        
    }
        
        
        // var result = {};
  
        // // Add the text and href of every link, and save them as properties of the result object
        // result.title = $(this)
        //   .children("a")
        //   .text();
        // result.link = $(this)
        //   .children("a")
        //   .attr("href");
  
        // // Create a new Article using the `result` object built from scraping
        // db.Article.create(result)
        //   .then(function(dbArticle) {
        //     // View the added result in the console
        //     console.log(dbArticle);
        //   })
        //   .catch(function(err) {
        //     // If an error occurred, log it
        //     console.log(err);
        //   });
      });
  
      // Send a message to the client
    //   res.send("Scrape Complete");
    });
  
  
  // Route for getting all Articles from the db
  router.get("/articles", function(req, res) {
    Articles.find(function(error,data){
        if (error){
            console.log("error");
        }
        else {
            console.log("============================================")
            console.log("data: ",data);
            res.json(data);
        }
    })
  });
  
  // Route for grabbing a specific Article by id, populate it with it's note
  router.get("/articles/:id", function(req, res) {
    Articles
    // TODO
    // ====
    // Finish the route so it finds one article using the req.params.id,
    // and run the populate method with "note",
    // then responds with the article with the note included
  });
  
  // Route for saving/updating an Article's associated Note
  router.post("/articles/:id", function(req, res) {
    Notes.create()
    // TODO
    // ====
    // save the new note that gets posted to the Notes collection
    // then find an article from the req.params.id
    // and update it's "note" property with the _id of the new note
  });

  module.exports = router;