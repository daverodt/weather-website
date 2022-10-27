const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up handlebars path
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "David Rodriguez",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "David Rodriguez",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Me",
    helpText: "This is very helpful text",
    name: "David Rodriguez",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide a query search term",
    });
  }
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(
      { latitude, longitude },
      (error, { temperature, feelslike, forecastData } = {}) => {
        if (error) {
          return res.send({ error });
        }
        // console.log(location)
        // console.log(forecastData)
        res.send({
          forecastData,
          location,
          temperature,
          feelslike,
        });
      }
    );
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorText: "This is not the article you are searching for",
    name: "David Rodriguez",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorText: "Not found",
    name: "David Rodriguez",
  });
});

app.listen(port, () => {
  console.log("Server is up in port " + port + ".");
});
