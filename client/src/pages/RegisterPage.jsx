import React from "react";

const RegisterPage = () => {
    return (
        <div className="auth-container">
            <h2>Create Your Account</h2>
            <p>Join us to start creating your own short links!</p>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Choose a strong password"
                        required
                    />
                </div>

                <button type="submit" className="btn">Register</button>
            </form>

            <p className="auth-switch">
                Already have an account?
            </p>
        </div>
    );
};

export default RegisterPage;