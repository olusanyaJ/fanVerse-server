require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/user-routes");
const postRoutes = require("./routes/post-routes");
const authRoutes = require("./routes/user-auth");
const dashboardRoutes = require("./routes/user-profile");

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.use("/user-auth", authRoutes);
app.use("/profile", dashboardRoutes);

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
