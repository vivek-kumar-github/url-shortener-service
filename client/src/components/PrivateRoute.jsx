import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * @param {object} props - The component's props
 * @param {React.ReactNode} props.children - The child components to render if authenticated
 * @returns {React.ReactElement} Either the children or a navigate component 
 */
const PrivateRoute = ({ children }) => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isAuthenticated) {
        return children
    }

    return <Navigate to="/login" replace />
};

export default PrivateRoute;