const router = require("express").Router();
const knex = require("knex")(require("../knexfile"));
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * POST /auth/register
 * - creates a new user on signup
 * - Expected body: { full_name, username, email, password }
 */
router.post("/signup", async (req, res) => {
  const { full_name, username, email, password } = req.body;
  if (!full_name) {
    return res.status().send("Enter your Full Name");
  }
  if (!username) {
    return res.status().send("Enter your username");
  }
  if (!email) {
    return res.status().send("Enter a valid Email");
  }
  if (!password) {
    return res.status().send("Enter a secure Password");
  }

  const decodedPassword = bcrypt.hashSync(password);

  const newUser = {
    full_name,
    username,
    email,
    password: decodedPassword,
  };

  try {
    await knex("user").insert(newUser);
    res.status(201).send("Registered successfully");
  } catch (error) {
    console.error(error);
    res.status(400).send("Failed registration");
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

  const user = await knex("user").where({ email: email }).first();
  if (!user) {
    return res.status(400).send("Invalid email");
  }

  const isPasswordCorrect = bcrypt.compareSync(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).send("Invalid password");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_KEY,
    { expiresIn: "24h" }
  );

  res.send({ token });
});

module.exports = router;
