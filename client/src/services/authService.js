import axios from "axios";

const API_URL = "/api/auth/";

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
        console.error("API Error: User registration failed ", error);
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error("An unexpected error occurred during registration.");
        }
    }
};

/**
 * @desc Logs in a user by sending their credentials to the backend
 * @param {object} credentials an object containing {email, password}
 * @returns {Promise<object>} A promise that resolves to the data returned from the API
 */
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(API_URL + "login", credentials);
        return response.data;
    } catch (error) {
        console.error("API Error: User login failed ", error);
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error("An unexpected error occurred during login.");
        }
    }
};