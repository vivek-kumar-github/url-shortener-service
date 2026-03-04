import React, { useState } from "react";
import { createShortUrl } from "../services/apiService";

const HomePage = () => {

    const [longUrl, setLongUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!longUrl) {
            alert("Please enter a URL to shorten.");
            return;
        }

        try {
            const response = await createShortUrl(longUrl);

            console.log("Successfully created short URL: ", response);
        } catch (error) {
            console.error("Error from API: ", error);
            alert(`Error: ${error.error || "Something went wrong!"}`);
        }
    };

    return (
        <div className="homepage-container">
            <h2>URL Shortener</h2>
            <p>Enter a long URL to make it short and easy to share!</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="longUrl-input">Your Long URL:</label>
                    <input
                        id="longUrl-input"
                        type="url"
                        placeholder="https://example.com/very/long/url/to/shorten"
                        value={longUrl}
                        onChange={(e) => setLongUrl(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn">Shorten</button>
            </form>
        </div>
    );
};

export default HomePage;