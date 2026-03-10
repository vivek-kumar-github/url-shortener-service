import axios from "axios";

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

        const response = await axios.post("/api/shorten", { longUrl }, config);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error("An unexpected error occurred. Please try again.");
        }
    }
};