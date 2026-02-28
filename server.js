require("dotenv").config();
const connectDB = require("./config/db");
const express = require("express");

connectDB();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running....");
});

const urlRoutes = require("./routes/urls");
app.use("/api", urlRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is available and running on port ${PORT}`));