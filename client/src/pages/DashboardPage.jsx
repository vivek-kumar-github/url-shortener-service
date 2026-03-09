import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserLinks } from "../services/linkService";

const DashboardPage = () => {
    const [links, setLinks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const { token, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                if (token) {
                    const response = await getUserLinks(token);
                    setLinks(response.data);
                }
            } catch (err) {
                console.error("Failed to fetch links:", err);
                const errorMessage = err.data || "Could not load your links.";
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLinks();
    }, [token]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="dashboard-container">
            <h2>My Dashboard</h2>
            <p>Welcome to your personal dashboard! Here you will be able to see all the links you have created.</p>
            <div className="links-list-placeholder">
                <p>Your links will appear here soon...</p>
            </div>

            <button onClick={handleLogout} className="btn btn-logout" style={{ marginTop: "2rem" }}>
                Logout
            </button>
        </div>
    );
};

export default DashboardPage;