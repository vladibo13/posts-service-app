const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.post("", async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await Post.create({ title, content });
    res.status(201).json({ msg: "post added", id: post.id });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get("", async (req, res) => {
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

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) res.status(404).json({ msg: "post not found" });
    res.status(200).json(post);
  } catch (e) {
    res.status(400).json(e);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Post.deleteOne({ _id: id });
    res.status(200).json({ msg: `deleted post with id = ${id}` });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.put("/:id", async (req, res) => {
  console.log("BODY = ", req.body);

  const { id, title, content } = req.body;
  try {
    // const post = await Post.create({ _id: id, title, content });
    await Post.updateOne({ _id: req.params.id }, { _id: id, title, content });

    res.status(200).json({ msg: "succefully updated post" });
  } catch (e) {
    res.status(400).json(e);
  }
});

module.exports = router;
