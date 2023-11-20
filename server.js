const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello World, Welcome to FanVerse!");
});

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
