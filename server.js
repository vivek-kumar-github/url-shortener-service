require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");

connectDB();
const app = express();
app.use(express.json());

const urlRoutes = require("./routes/urls");
app.use("/api", urlRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is available and running on port ${PORT}`));