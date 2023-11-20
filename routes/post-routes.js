const knex = require("knex")(require("../knexfile"));
const router = require("express").Router();

// get all posts
router.get("/", async (_req, res) => {
  try {
    const data = await knex("post");
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving Users: ${err}`);
  }
});

// Create a new post
router.post("/", async (req, res) => {
  try {
    const { user_id, user_name, content } = req.body;
    const post = await knex("post").insert({ user_id, user_name, content });
    res.json({ post_id: post[0], user_id, user_name, content });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Retrieve a specific post
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await knex("post").where({ id }).first();
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await knex("post").where({ id }).first();
    res.json(deletedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
