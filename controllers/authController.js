const User = require("../models/User");
const bcrypt = require("bcryptjs");

/**
 * @desc   Register a new user
 * @route  POST /api/auth/register
 * @access Public
 */
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, error: "Please provide name email and password" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, error: "A user with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            data: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (err) {
        console.error("Registeration error: ", err);

        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

module.exports = {
    registerUser,
};