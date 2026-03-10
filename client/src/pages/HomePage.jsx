import React, { useState } from "react";
import { createShortUrl } from "../services/apiService";
import Spinner from "../components/Spinner";

const HomePage = () => {
    const [longUrl, setLongUrl] = useState("");
    const [shortUrlData, setShortUrlData] = useState(null);
    const [isCopied, setIsCopied] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!longUrl) {
            setError("Please enter a URL to shorten.");
            setShortUrlData(null);
            return;
        }

        try {
            setError("");
            setIsLoading(true);
            const response = await createShortUrl(longUrl);
            setShortUrlData(response.data);
        } catch (err) {
            const errorMessage = err.error || "An unexpected error occurred.";
            setError(errorMessage);
            setShortUrlData(null);
            console.error("Error from API: ", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        if (!shortUrlData?.shortUrl) return;

        try {
            await navigator.clipboard.writeText(shortUrlData.shortUrl);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy URL: ", err);
        }
    };

    return (
        <div className="homepage-container">
            <div className="text-center mb-4">
                <h1 className="mb-2">Transform Your Links</h1>
                <p className="text-xl text-secondary mb-4">
                    Create short, memorable URLs in seconds. Share anywhere, track everywhere.
                </p>
            </div>

            <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
                <div className="card-header">
                    <h2 className="mb-0">Shorten Your URL</h2>
                    <p className="text-secondary mb-0">Paste your long URL below and get a short link instantly</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="longUrl-input">Your Long URL</label>
                        <input
                            id="longUrl-input"
                            type="url"
                            placeholder="https://example.com/very/long/url/to/shorten"
                            value={longUrl}
                            onChange={(e) => setLongUrl(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn"
                        disabled={isLoading}
                        style={{ width: "100%" }}
                    >
                        {isLoading && <Spinner size="small" />}
                        {isLoading ? "Shortening..." : "Shorten URL"}
                    </button>
                </form>

                {error && (
                    <div className="error-message">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {shortUrlData && (
                    <div className="card" style={{ marginTop: "2rem", backgroundColor: "var(--bg-tertiary)" }}>
                        <div className="text-center">
                            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
                            <h3 className="mb-3">Your Short URL is Ready!</h3>
                            <div className="flex items-center gap-2 mb-3" style={{
                                backgroundColor: "var(--bg-primary)",
                                padding: "var(--spacing-md)",
                                borderRadius: "var(--radius-md)",
                                border: "1px solid var(--border-color)"
                            }}>
                                <a
                                    href={shortUrlData.shortUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        fontWeight: "600",
                                        color: "var(--primary-color)",
                                        wordBreak: "break-all",
                                        flex: 1
                                    }}
                                >
                                    {shortUrlData.shortUrl}
                                </a>
                                <button
                                    type="button"
                                    className="btn btn-secondary btn-small"
                                    onClick={handleCopy}
                                >
                                    {isCopied ? "✓ Copied" : "Copy"}
                                </button>
                            </div>
                            <p className="text-muted text-sm">
                                Original: {shortUrlData.longUrl.substring(0, 60)}...
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <div className="text-center mt-4" style={{ maxWidth: "600px", margin: "0 auto" }}>
                <div className="card" style={{ backgroundColor: "var(--bg-tertiary)" }}>
                    <h3 className="mb-2">Why Choose Short.ly?</h3>
                    <div className="grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "var(--spacing-lg)", marginTop: "var(--spacing-lg)" }}>
                        <div className="text-center">
                            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⚡</div>
                            <h4>Lightning Fast</h4>
                            <p className="text-secondary">Create short URLs in milliseconds</p>
                        </div>
                        <div className="text-center">
                            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📊</div>
                            <h4>Track Clicks</h4>
                            <p className="text-secondary">Monitor your link performance</p>
                        </div>
                        <div className="text-center">
                            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔒</div>
                            <h4>Secure</h4>
                            <p className="text-secondary">Safe and reliable URL shortening</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;