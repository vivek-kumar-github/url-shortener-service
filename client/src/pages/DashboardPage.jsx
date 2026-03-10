import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserLinks } from "../services/linkService";
import Spinner from "../components/Spinner";

const DashboardPage = () => {
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [copiedId, setCopiedId] = useState(null);
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLinks = async () => {
            if (token) {
                try {
                    const response = await getUserLinks(token);
                    setLinks(response.data);
                } catch (err) {
                    console.error("Failed to fetch links:", err);
                    const errorMessage = err.data || "Could not load your links.";
                    setError(errorMessage);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
                setError("You are not authorized to view this page. Please log in.");
            }
        };

        fetchLinks();

    }, [token]);

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
    }

    return (
        <div className="dashboard-container">
            <h2>My Dashboard</h2>
            <p>Welcome! Here are all the links you have created.</p>
            <div className="links-list-container" style={{ marginTop: "2rem" }}>
                {isLoading ? (
                    <div style={{ display: "flex", justifyContent: "center", padding: "1rem" }}>
                        <Spinner />
                    </div>
                ) :
                    error ? (
                        <p className="error-message" style={{ color: "red" }}>Error: {error}</p>
                    ) :
                        links.length > 0 ? (
                            <table className="links-table" style={{ width: "100%", borderCollapse: "collapse" }}>
                                <thead>
                                    <tr style={{ borderBottom: "2px solid #333" }}>
                                        <th style={{ padding: "8px", textAlign: "left" }}>Original URL</th>
                                        <th style={{ padding: "8px", textAlign: "left" }}>Short URL</th>
                                        <th style={{ padding: "8px", textAlign: "left" }}>Clicks</th>
                                        <th style={{ padding: "8px", textAlign: "left" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {links.map((link) => (
                                        <tr key={link._id} style={{ borderBottom: "1px solid #ddd" }}>
                                            <td style={{ padding: "8px", wordBreak: "break-all" }}>
                                                <a href={link.longUrl} title={link.longUrl} target="_blank" rel="noopener noreferrer">
                                                    {link.longUrl.length > 50
                                                        ? link.longUrl.substring(0, 50) + "..."
                                                        : link.longUrl}
                                                </a>
                                            </td>
                                            <td style={{ padding: "8px" }}>
                                                <a href={link.shortUrl} target="_blank" rel="noopener noreferrer">
                                                    {link.shortUrl}
                                                </a>
                                            </td>
                                            <td style={{ padding: "8px", textAlign: "center" }}>
                                                {link.clicks}
                                            </td>
                                            <td style={{ padding: "8px" }}>
                                                <button
                                                    type="button"
                                                    className="btn btn-copy btn-small"
                                                    onClick={() => handleCopy(link._id, link.shortUrl)}
                                                >
                                                    {copiedId === link._id ? "Copied" : "Copy"}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>You haven't created any short links yet. Go to the homepage to create your first one!</p>
                        )}
            </div>
            <button onClick={handleLogout} className="btn btn-logout" style={{ marginTop: "2rem" }}>
                Logout
            </button>
        </div>
    );
};

export default DashboardPage;