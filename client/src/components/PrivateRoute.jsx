import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

/**
 * @param {object} props - The component's props
 * @param {React.ReactNode} props.children - The child components to render if authenticated
 * @returns {React.ReactElement} Either the children or a navigate component
 */
const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;