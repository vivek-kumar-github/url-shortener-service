const express = require("express");

const router = express.Router();

/**
 * @route  GET /api/links/my-links
 * @desc   Get all links created by the logged-in user
 * @access Private
 */
router.get("/my-links", (req, res) => {

    res.status(200).json({ success: true, message: "Links route is working." });
});

module.exports = router;