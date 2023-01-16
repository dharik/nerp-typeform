var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
require('dotenv').config()

var apiRouter = require("./routes/api");

var app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.options(cors());

app.use("/api", apiRouter);

// To handle images, css, etc
app.use(express.static(path.join(__dirname, "client/build")));

// To handle client defined routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

module.exports = app;
