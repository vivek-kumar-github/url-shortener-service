const express = require("express");

const router = express.Router();

/**
 * @route  GET /:code
 * @desc   Redirect to the long/original URL
 * @access Public
 */

router.get("/:code", (req, res) => {
    const { code } = req.params;
    
    res.status(200).json({
        success: true,
        message: "Redirect route is working!",
        capturedCode: code,
    });
});

module.exports = router;