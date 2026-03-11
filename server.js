require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");

connectDB();
const app = express();
app.use(cors({ origin: "*" }))
app.use(express.json());

const urlRoutes = require("./routes/urls");
app.use("/api", urlRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const linksRoutes = require("./routes/links");
app.use("/api/links", linksRoutes);

const indexRoutes = require("./routes/index");
app.use("/", indexRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is available and running on port ${PORT}`));