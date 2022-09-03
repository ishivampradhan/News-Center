const express = require("express");
const bodyParser = require("body-parser");
const NewsAPI = require("newsapi");
const { stringify } = require("qs");
const { response } = require("express");
const newsapi = new NewsAPI("b9eccbacd80b4b26a52e798c3b9740ae");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json()); // to support JSON-encoded bodies

app.get("/", function (req, res) {
  newsapi.v2
    .everything({
      q: "world",
      language: "en",
    })
    .then((response) => {
      console.log(response);
      res.render("home", {
        posts: response.articles,
      });
    });
});

app.post("/", function (req, res) {
  var x = req.body.topic;
  newsapi.v2
    .topHeadlines({
      q: x,
      language: "en",
    })
    .then((response1) => {
      newsapi.v2
        .everything({
          q: x,
          language: "en",
        })
        .then((response2) => {
          var result = [...response1.articles, ...response2.articles];
          console.log(result);
          res.render("news", {
            posts: result,
          });
        })
        .catch((err) => {
          console.log(err);
          //res.redirect("/");
        });
    });
});

app.listen(3000, function () {
  console.log("listening on port");
});

// const api = {
//   url: "https://newsapi.org/v2/everything",
//   apikey: "b9eccbacd80b4b26a52e798c3b9740ae",
// };

// const search = document.querySelector("#search-box");
// search.addEventListener("keypress", getValue);
// function getValue(e) {
//   if (e.keyCode == 13) {
//     getData(search.value);
//   }
// }

// function getData(query) {
//   const apiurl = api.url + "?q=" + query + "&apikey=" + api.apikey;
//   fetch(apiurl)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       console.log(data);
//       getNews(data);
//     })
//     .catch(() => alert("Invalid request"));
// }

// function getNews(data) {
//   console.log(data);
// }

// https://newsapi.org/v2/everything?q=keyword&apiKey=b9eccbacd80b4b26a52e798c3b9740ae
//news api key b9eccbacd80b4b26a52e798c3b9740ae
