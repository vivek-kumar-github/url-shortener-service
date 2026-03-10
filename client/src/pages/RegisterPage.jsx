import React, { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import Spinner from "../components/Spinner";

const RegisterPage = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!formData.name || !formData.email || !formData.password) {
            setError("All fields are required.");
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await registerUser(formData);

            console.log("Registration successful: ", response);
            setSuccess("Registration successful! Please login");

            setFormData({ name: "", email: "", password: "" });
        } catch (err) {
            const errorMessage = err.error || "Registration failed. Please try again.";
            setError(errorMessage);
            console.error("Registration error: ", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Create Your Account</h2>
            <p>Join us to start creating your own short links!</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

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
                        placeholder="Choose a strong password"
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
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", justifyContent: "center" }}
                >
                    {isSubmitting && <Spinner size="small" />}
                    {isSubmitting ? "Registering..." : "Register"}
                </button>
            </form>

            {error && <p className="error-message" style={{ color: "red" }}>{error}</p>}
            {success && <p className="success-message" style={{ color: "green" }}>{success}</p>}

            <p className="auth-switch">
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
};

export default RegisterPage;