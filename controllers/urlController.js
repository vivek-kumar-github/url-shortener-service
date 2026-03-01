const validUrl = require("valid-url");
const Url = require("../models/Url");

/**
 * @desc   This function will be responsible for creating new short URL.
 * @route  POST /api/shorten
 * @access Public
 */

const shortenUrl = async (req, res) => {
    const { longUrl } = req.body;
    console.log("Recieved long URL: ", longUrl);

    if (!longUrl) {
        return res.status(400).json({ success: false, error: "Please provide a URL" });
    }

    if (!validUrl.isUri(longUrl)) {
        return res.status(400).json({ success: false, error: "Invalid URL format provided" });
    }

    try {
        let url = await Url.findOne({longUrl: longUrl });
        if (url) {
            return res.status(200).json({ success: true, data: url });
        }

        res.status(200).json({ success: true, message: "URL is new and valid."});
        
    } catch (err) {
        console.error("Database error:", err);
        
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

module.exports = {
    shortenUrl,
}