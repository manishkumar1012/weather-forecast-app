const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Manish",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Manish",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Manish",
    message: "Contact me for help.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "Please provide a location!",
    });
  }

  geocode(
    req.query.location,
    (error, { latitude, longitude, placeName } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
            location: placeName,
            forecast: forecastData,
        });
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Manish",
    errorMessage: "Page not found!",
  });
});

app.listen(3000, () => {
  console.log("server running on port 3000");
});
