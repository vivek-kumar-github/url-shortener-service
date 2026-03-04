import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in with: ", formData);
    };

    return (
        <div className="auth-container">
            <h2>Welcome Back!</h2>
            <p>Log in to access your dashboard.</p>

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

                <button type="submit" className="btn">Login</button>
            </form>

            <p className="auth-switch">
                Don't have an account? <Link to="/register">Register now</Link>
            </p>
        </div>
    );
};

export default LoginPage;