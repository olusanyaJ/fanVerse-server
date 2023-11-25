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
    } else if (sportsType === "football") {
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

/**
 * POST /posts/
 * - Creates a new post
 * - Adds the new post to the list of all posts from the Db
 * - Expected body: { user_id, user_name, content, sports_type }
 */
router.post("/", async (req, res) => {
  try {
    const { user_id, user_name, content, sports_type } = req.body.data;
    const [id] = await knex("post").insert({
      user_id,
      user_name,
      content,
      sports_type,
    });
    res.status(201).json({ id, user_id, user_name, content, sports_type });
  } catch (error) {
    console.error("Error creating post:", error);
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
 * GET /posts/user/:user_id
 * - Retrieves all the posts of a specific user_id from the post table
 */
router.get("/users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const posts = await knex("post").where({ user_id });
    if (!posts) {
      return res.status(404).json({ error: "No posts found for this user" });
    }
    res.json(posts);
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
    await knex("post").where({ id }).del();

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
