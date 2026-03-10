const jwt = require("jsonwebtoken");

/**
 * @desc this middleware function verifies the JWT sent by the client
 */
const auth = (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        return next();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user;

        next();
    } catch (err) {
        res.status(401).json({ success: false, error: "Token is not valid" });
    }
};

module.exports = auth;