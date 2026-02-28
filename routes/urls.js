const express = require("express");

const router = express.Router();

/**
 * @route  POST /api/shorten
 * @desc   Create a new short URL
 * @access Public
 */
router.post("/shorten",(req, res) => {
    res.status(200).json({success: true, message: "Route is working!..."});
});

module.exports = router;