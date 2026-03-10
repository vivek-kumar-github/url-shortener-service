import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import Spinner from "../components/Spinner";

const RegisterPage = () => {
    const navigate = useNavigate();

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
            setSuccess("Registration successful! Redirecting to login...");

            setTimeout(() => {
                navigate("/login")
            }, 2000);

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
        <div className="auth-container" style={{ maxWidth: "400px", margin: "2rem auto" }}>
            <div className="card">
                <div className="text-center mb-4">
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>👋</div>
                    <h2 className="mb-2">Create Your Account</h2>
                    <p className="text-secondary">Join Short.ly and start creating amazing short links</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your full name"
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
                        className="btn btn-success"
                        disabled={isSubmitting}
                        style={{ width: "100%" }}
                    >
                        {isSubmitting && <Spinner size="small" />}
                        {isSubmitting ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                {error && <div className="error-message">{error}</div>}
                {success && <div className="success-message">{success}</div>}

                <div className="text-center mt-4">
                    <p className="auth-switch mb-0">
                        Already have an account?{" "}
                        <Link to="/login" style={{ fontWeight: "600" }}>
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;