/**
 * @desc   This function will be responsible for creating new short URL.
 *         It will handle the business logic of validating the long URL,
 *         checking for its existence, generating a short code, and saving
 *         it to the database.
 * @routes POST /api/shorten
 * @access Public
 */

const shortenUrl = async (req, res) => {
    

    res.status(200).json({ success: true, message: "Controller is now connected!..."});
};

module.exports = {
    shortenUrl,
}