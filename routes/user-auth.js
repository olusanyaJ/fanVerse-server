const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * POST /auth/register
 * - creates a new user on signup
 * - Expected body: { username, email, password }
 */
router.post("/signup", async (req, res) => {
  const { username, email, password, tennis, football } = req.body;
  if (!username) {
    return res.status(400).send("Enter your username");
  }
  if (!email) {
    return res.status(400).send("Enter a valid Email");
  }
  if (!password) {
    return res.status(400).send("Enter a secure Password");
  }

  if (!tennis && !football) {
    return res.status(400).send("Choose a Sport");
  }

  // const decodedPassword = bcrypt.hashSync(password);

  const newUser = {
    username,
    email,
    // password: decodedPassword,
    password: password,
    tennis,
    football,
  };

  try {
    await knex("user").insert(newUser);
    res.status(201).send("Registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed registration");
  }
});

/**
 * POST /auth/login
 * - Implements user login
 * - Expected body: { email, password }
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status().send("Enter your username");
  }
  if (!password) {
    return res.status().send("Enter your password");
  }

  const user = await knex("user").where({ username: username }).first();
  if (!user) {
    return res.status(400).send("Invalid Username");
  }

  const isPasswordCorrect = await knex("user").where({
    password: user.password,
  });

  // const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).send("Invalid password");
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_KEY,
    { expiresIn: "24h" }
  );

  res.send({ token });
});

module.exports = router;
