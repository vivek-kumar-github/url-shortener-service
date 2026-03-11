import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/auth/`;

/**
 * @desc    Register a new user by sending their data to the backend
 * @param   {object} userData an object containing {name, email, password}
 * @returns {Promise<object>} A promise that resolves to the data returned from the API
 */
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(API_URL + "register", userData);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error("An unexpected error occurred during registration.");
        }
    }
};

/**
 * @desc    Logs in a user by sending their credentials to the backend
 * @param   {object} credentials an object containing {email, password}
 * @returns {Promise<object>} A promise that resolves to the data returned from the API
 */
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(API_URL + "login", credentials);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error("An unexpected error occurred during login.");
        }
    }
};
/**
 * @desc    Fetches the current authenticated user's profile
 * @param   {string} token the JWT token
 * @returns {Promise<object>} A promise that resolves to the user data returned from the API
 */
export const getCurrentUser = async (token) => {
    try {
        const response = await axios.get(API_URL + "me", {
            headers: {
                "x-auth-token": token,
            },
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error("An unexpected error occurred.");
        }
    }
};