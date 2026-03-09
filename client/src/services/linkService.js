import axios from "axios";

const API_URL = "/api/links/";

/**
 * @desc    Fetches all links associated with the currently authenticated user.
 * @param   {string} token The JSON web token for authentication.
 * @returns {Promise<object>} A promise that resolves to the API response data.
 * @throws  an error if the API request fails.
 */
export const getUserLinks = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.get(API_URL + 'my-links', config);
        return response.data;
    } catch (error) {
        console.log("API Error: Failed to fetch user links", error);
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error("An unexpected error occurred while fetching links");
        }
    }
};