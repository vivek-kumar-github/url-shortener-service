import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";

/**
 * @param {object} props - The component's props
 * @param {React.ReactNode} props.children - The child components to render if authenticated
 * @returns {React.ReactElement} Either the children or a navigate component 
 */
const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
                <Spinner />
            </div>
        );
    }

    if (isAuthenticated) {
        return children
    }

    return <Navigate to="/login" replace />
};

export default PrivateRoute;