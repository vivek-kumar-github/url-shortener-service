const express = require("express");
const { shortenUrl } = require("../controllers/urlController");
const auth = require("../middleware/auth");

const router = express.Router();

/**
 * @route  POST /api/shorten
 * @desc   Create a new short URL
 * @access Public
 */
router.post("/shorten", auth, shortenUrl);

module.exports = router;