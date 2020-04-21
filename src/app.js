const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname,'../public')))
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));

hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "Mahendra Reddy",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "you must provide address",
    });
  }
  geoCode(address, (error, data = {}) => {
    if (error) {
      return res.send({
        error: "geo location not found",
      });
    }
    forecast(data.longitude, data.latitude, (error, forecastData = {}) => {
      console.log(forecastData)
      if (error) {
        return res.send({
          error: "forecast failed",
        });
      }
      res.send({
        address: req.query.address,
        forecast: forecastData,
        location: data,
      });
    });
  });
  // res.send({
  //   forecast: "might rain",
  //   location: "guntur",
  //   address: req.query.address,
  // });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    company: "Hcl",
    name: "Mahendra Reddy",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    emergency: "9010777749",
    other: "7337799841",
    name: "Mahendra Reddy",
  });
});

app.get("/help/*", (req, res) => {
  res.render("pagenotfound", {
    title: "Arical Not Found",
    text: "Artical not found",
    name: "Mahendra Reddy",
  });
});

app.get("*", (req, res) => {
  res.render("pagenotfound", {
    title: "Page Not Found",
    text: "page not found",
    name: "Mahendra Reddy",
  });
});

app.listen(port, () => {
  console.log("Server is up on port 3000");
});
