const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");

/**
 * GET /profile
 * - Gets the profile of a logged in user
 * - If no valid JWT is provided, this route will respond with 401 Unauthorized.
 * - Expected headers: { Authorization: "Bearer JWT_TOKEN_HERE" }
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
  } catch (error) {
    res.status(401).send("Invalid auth token");
  }
});

module.exports = router;
