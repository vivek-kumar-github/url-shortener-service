import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, getCurrentUser } from "../services/authService";
import { useAuth } from "../context/useAuth";
import Spinner from "../components/Spinner";

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {login} = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.email || !formData.password) {
            setError("Both email and password are required.");
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await loginUser(formData);

            if (response.token) {
                const userResponse = await getCurrentUser(response.token);
                
                login(response.token, userResponse.data);
                navigate("/dashboard");
            } else {
                setError("Login successful, but no token provided.");
            }

        } catch (err) {
            const errorMessage = err.error || "Login failed. Please check your credentials.";
            setError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-container" style={{ maxWidth: "400px", margin: "2rem auto" }}>
            <div className="card">
                <div className="text-center mb-4">
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔐</div>
                    <h2 className="mb-2">Welcome Back</h2>
                    <p className="text-secondary">Sign in to your account to continue</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn"
                        disabled={isSubmitting}
                        style={{ width: "100%" }}
                    >
                        {isSubmitting && <Spinner size="small" />}
                        {isSubmitting ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                {error && <div className="error-message">{error}</div>}

                <div className="text-center mt-4">
                    <p className="auth-switch mb-0">
                        Don't have an account?{" "}
                        <Link to="/register" style={{ fontWeight: "600" }}>
                            Create one here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;