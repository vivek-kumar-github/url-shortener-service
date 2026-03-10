const express = require("express");
const auth = require("../middleware/auth");
const { registerUser, loginUser, getCurrentUser } = require("../controllers/authController");

const router = express.Router();

/**
 * @route  POST /api/auth/register
 * @desc   Register a new user
 * @access Public
 */
router.post("/register", registerUser);

/**
 * @route  POST /api/auth/login
 * @desc   Authenticate a user and get a token
 * @access Public
 */
router.post("/login", loginUser);

/**
 * @route  GET /api/auth/me
 * @desc   Get current authenticated user
 * @access Private
 */
router.get("/me", auth, getCurrentUser);

module.exports = router;