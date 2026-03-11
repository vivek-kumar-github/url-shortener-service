import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

/**
 * @desc    Sends a long URL to the backend API to be shortened
 * @param   {string} longUrl The URL that the user wants to shorten
 * @returns {Promise<object>} A promise that resolves to the data returned from the API
 */
export const createShortUrl = async (longUrl) => {
    try {
        const token = localStorage.getItem("token");
        const config = token
            ? { headers: { "x-auth-token": token } }
            : {};

        const response = await axios.post(`${API_URL}/shorten`, { longUrl }, config);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error("An unexpected error occurred. Please try again.");
        }
    }
};