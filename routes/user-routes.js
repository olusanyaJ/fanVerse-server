const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));

/**
 * GET /users
 * - Retrieves the list of all users from the Db
 */
router.get("/", async (_req, res) => {
  try {
    const data = await knex("user");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving Users: ${err}`);
  }
});

/**
 * GET /users/:id
 * - Retrieves a specific user from the users table
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await knex("user").where({ id }).first();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /users/:id
 * - Deletes a specific user from the users table
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await knex("post").where({ id }).first();
    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
