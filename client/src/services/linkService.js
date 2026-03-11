import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/links/`;

/**
 * @desc    Fetches all links associated with the currently authenticated user.
 * @param   {string} token The JSON web token for authentication.
 * @returns {Promise<object>} A promise that resolves to the API response data.
 * @throws  an error if the API request fails.
 */
export const getUserLinks = async (token) => {
    const config = {
        headers: {
            "x-auth-token": token,
        },
    };

    try {
        const response = await axios.get(API_URL + 'my-links', config);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            const errorData = {
                ...error.response.data,
                status: error.response.status
            };
            throw errorData;
        } else {
            throw new Error("An unexpected error occurred while fetching links");
        }
    }
};