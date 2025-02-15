import React, { useState } from 'react';
import '../App.css';
import Header from '../components/Header';

function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

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
        <div className="bg-gray-900 text-white font-sans min-h-screen flex flex-col">
            {/* Header */}
            <Header />

            {/* Main Layout */}
            <div className="flex flex-1 items-center justify-center container mx-auto p-6">
                {/* Main Content */}
                <main className="flex-1 text-center">
                    <h1 className="text-3xl font-semibold mb-6">Reset Your Password</h1>
                    <p className="mb-4 text-gray-300">Enter your email address below, and we'll send you a link to reset your password.</p>
                    <div className="w-full max-w-md mx-auto">
                        <input
                            type="email"
                            className="w-full px-4 py-2 mb-2 rounded-md text-black focus:outline-none"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                        <button
                            onClick={handleResetPassword}
                            className="w-full bg-orange-500 px-4 py-2 rounded-md hover:bg-orange-600"
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
