const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));

/**
 * GET /posts
 * GET /posts?sports_type="sportyType"
 * - Retrieves the list of all posts from the Db
 * Retrieves the list of all posts according to "sportyType" from the Db
 */
router.get("/", async (req, res) => {
  try {
    const data = await knex("post");

    const sportsType = req.query.sports_type;
    let filteredPosts;

    if (sportsType === "tennis") {
      filteredPosts = data.filter(
        (dataObject) => dataObject.sports_type === "tennis"
      );
    }
    if (sportsType === "football") {
      filteredPosts = data.filter(
        (dataObject) => dataObject.sports_type === "football"
      );
    } else {
      filteredPosts = data;
    }

    res.status(200).json(filteredPosts);
  } catch (err) {
    res.status(400).send(`Error retrieving tennisPosts: ${err}`);
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

/**
 * GET /posts/:id
 * - Retrieves a specific post from the post table
 */
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

/**
 * GET /posts/:id
 * - Deletes a specific post from the post table
 */
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
