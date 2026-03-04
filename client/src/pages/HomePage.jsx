import React, { useState } from "react";

const HomePage = () => {

    const [longUrl, setLongUrl] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("URL to be shortened: ", longUrl);
    };

    return (
        <div>
            <h2>URL Shortener</h2>
            <p>Enter a long URL to make it short and easy to share!</p>
            <form onSubmit={handleSubmit}>
                <div>
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
                <button type="submit">Shorten</button>
            </form>
        </div>
    );
};

export default HomePage;