const express = require("express");
const { shortenUrl } = require("../controllers/urlController");

const router = express.Router();

/**
 * @route  POST /api/shorten
 * @desc   Create a new short URL
 * @access Public
 */
router.post("/shorten", shortenUrl);

module.exports = router;