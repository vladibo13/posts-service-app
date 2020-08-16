require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const postRoutes = require("./routes/posts.router");
// const cors = require("cors");

app.use(bodyParser.json());
// app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  next();
});

app.use("/api/posts", postRoutes);

module.exports = app;
