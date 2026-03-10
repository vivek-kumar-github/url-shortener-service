import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { getUserLinks } from "../services/linkService";
import Spinner from "../components/Spinner";

const DashboardPage = () => {
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [copiedId, setCopiedId] = useState(null);
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    const fetchLinks = async () => {
        if (token) {
            try {
                const response = await getUserLinks(token);
                console.log("Response from getUserLinks:", response);
                setLinks(response.data || []);
                } catch (err) {
                    console.error("Failed to fetch links:", err);
                    if (err.error === "Token is not valid" || err.status === 401) {
                        logout();
                        navigate("/login");
                        return;
                    }
                    const errorMessage = err.data || err.error || "Could not load your links.";
                    setError(errorMessage);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
                setError("You are not authorized to view this page. Please log in.");
            }
        };

    useEffect(() => {
        fetchLinks();
    }, [token, logout, navigate]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleCopy = async (id, text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error("Failed to copy URL: ", err);
        }
    };

    const handleRefresh = async () => {
        setIsLoading(true);
        setError("");
        await fetchLinks();
    };

    return (
        <div className="dashboard-container">
            <div className="card mb-4">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="mb-1">My Dashboard</h2>
                        <p className="text-secondary mb-0">Manage and track all your shortened links</p>
                    </div>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                        <button onClick={handleRefresh} className="btn btn-secondary btn-small">
                            🔄 Refresh
                        </button>
                        <div style={{ fontSize: "2rem" }}>📊</div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h3 className="mb-0">Your Links</h3>
                </div>

                <div className="links-list-container">
                    {isLoading ? (
                        <div className="text-center py-4">
                            <Spinner />
                            <p className="text-secondary mt-2">Loading your links...</p>
                        </div>
                    ) : error ? (
                        <div className="error-message">{error}</div>
                    ) : links.length > 0 ? (
                        <div className="table-responsive">
                            <table className="links-table">
                                <thead>
                                    <tr>
                                        <th>Original URL</th>
                                        <th>Short URL</th>
                                        <th className="text-center">Clicks</th>
                                        <th className="text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {links.map((link) => (
                                        <tr key={link._id}>
                                            <td>
                                                <a
                                                    href={link.longUrl}
                                                    title={link.longUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="link-original"
                                                >
                                                    {link.longUrl.length > 50
                                                        ? link.longUrl.substring(0, 50) + "..."
                                                        : link.longUrl}
                                                </a>
                                            </td>
                                            <td>
                                                <a
                                                    href={link.shortUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="link-short"
                                                >
                                                    {link.shortUrl}
                                                </a>
                                            </td>
                                            <td className="text-center">
                                                <span className="clicks-badge">{link.clicks}</span>
                                            </td>
                                            <td className="text-center">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary btn-small"
                                                    onClick={() => handleCopy(link._id, link.shortUrl)}
                                                >
                                                    {copiedId === link._id ? "✓ Copied" : "Copy"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-4">
                            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔗</div>
                            <h3 className="mb-2">No links yet</h3>
                            <p className="text-secondary mb-3">
                                You haven't created any short links yet. Head to the homepage to create your first one!
                            </p>
                            <Link to="/" className="btn btn-primary">
                                Create Your First Link
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <div className="text-center mt-4">
                <button onClick={handleLogout} className="btn btn-danger">
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;