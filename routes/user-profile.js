const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");

/**
 * POST /auth/register
 * - creates a new user on signup
 * - Expected body: { full_name, username, email, password }
 */
router.post("/profile", async (req, res) => {
  const authCheck = req.headers.authorization;
  if (!authCheck) {
    return res.status(401).send("Please Login");
  }
  const authToken = authCheck.split(" ")[1];

  try {
    const decodeToken = jwt.verify(authToken, JWT_KEY);
    const userProfile = await knex("user")
      .where({ id: decodeToken.id })
      .first();
    delete userProfile.password;
    res.status(400).send(userProfile);
  } catch (error) {}
});

module.exports = router;
