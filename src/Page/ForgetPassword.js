import React, { useState } from 'react';
import '../App.css';
import Header from '../components/Header';
import { useTheme } from './ThemeContext';

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const { theme } = useTheme();

    const handleResetPassword = () => {
        // Simple email validation
        if (!email) {
            setError("Please enter your email.");
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
        } else {
            setError("");
            // Logic to send a reset password link can go here.
            alert("A password reset link has been sent to your email.");
        }
    };

    return (
        <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
            {/* Header */}
            <Header />

            {/* Main Layout */}
            <div className="flex flex-1 items-center justify-center container mx-auto p-6">
                {/* Main Content */}
                <main className="flex-1 text-center">
                    <h1 className={`text-3xl font-semibold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Reset Your Password
                    </h1>
                    <p className={`mb-4 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                        Enter your email address below, and we'll send you a link to reset your password.
                    </p>
                    <div className="w-full max-w-md mx-auto">
                        <input
                            type="email"
                            className={`w-full px-4 py-2 mb-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                                theme === "dark"
                                ? "bg-gray-700 text-gray-300 border-gray-600 placeholder-gray-400"
                                : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
                            } border`}
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                        <button
                            onClick={handleResetPassword}
                            className="w-full bg-orange-500 px-4 py-2 rounded-md hover:bg-orange-600 text-white transition-colors"
                        >
                            Send Reset Link
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ForgetPassword;
