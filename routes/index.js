const express = require("express");
const { redirectToUrl } = require("../controllers/urlController");

const router = express.Router();

/**
 * @route  GET /:code
 * @desc   Redirect to the long/original URL
 * @access Public
 */

router.get("/:code", redirectToUrl);

module.exports = router;