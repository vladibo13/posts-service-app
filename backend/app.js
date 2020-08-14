const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

  next();
});

app.post("/api/posts", (req, res) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({ msg: "post created" });
});

app.use("/api/posts", (req, res) => {
  const posts = [
    { id: "1", title: "first post from backend", content: "my content 1" },
    { id: "2", title: "second post from backend", content: "my content 2" },
    { id: "3", title: "third post from backend", content: "my content 3     " },
  ];

  res.status(200).json({
    msg: "succefully fetched posts",
    posts,
  });
});

module.exports = app;
