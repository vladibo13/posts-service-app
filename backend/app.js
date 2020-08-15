require("dotenv").config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const cors = require("cors");

const { DB_URL } = process.env;
const Post = require("./models/post");

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
    "GET, POST, PATCH, DELETE, OPTIONS"
  );

  next();
});

app.post("/api/posts", async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await Post.create({ title, content });
    res.status(201).json({ msg: "post added", id: post.id });
  } catch (e) {
    res.status(400).json(e);
  }
});

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({
      msg: "succefully fetched posts",
      posts,
    });
  } catch (e) {
    res.status(400).json(e);
  }
});

app.delete("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Post.deleteOne({ _id: id });
    res.status(200).json({ msg: `deleted post with id = ${id}` });
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = app;
