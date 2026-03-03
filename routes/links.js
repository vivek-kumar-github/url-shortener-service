const express = require("express");
const auth = require("../middleware/auth");
const { getMyLinks } = require("../controllers/linksController");

const router = express.Router();

/**
 * @route  GET /api/links/my-links
 * @desc   Get all links created by the logged-in user
 * @access Private
 */
router.get("/my-links", auth, getMyLinks);

module.exports = router;