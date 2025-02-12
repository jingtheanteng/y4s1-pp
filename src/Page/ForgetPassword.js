import React, { useState } from 'react';
import { FaUserLarge, FaPeopleGroup } from "react-icons/fa6";
import { FaSearch, FaBell, FaCog } from "react-icons/fa";
import { MdHomeFilled } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
    const [searchTerm, setSearchTerm] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignInClick = () => {
        navigate('/loginregister');
    };

    const handleSignUpClick = () => {
        navigate('/loginregister');
    };

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleCommunitiesClick = () => {
        navigate('/communities');
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const handleSettingClick = () => {
        navigate('/setting');
    };

    const handleNotificationClick = () => {
        navigate('/notification');
    };

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
            <header className="bg-blue-700 p-4">
                <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                        <img src="logo.png" alt="Knowledgechain" className="w-10 h-10" />
                        <span className="text-2xl font-bold text-white">Knowledgechain</span>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center space-x-0 lg:space-x-12 w-full lg:w-auto">
                        <div className="flex items-center justify-between w-full lg:w-auto mb-4 lg:mb-0 space-x-8">
                            <MdHomeFilled
                                className="cursor-pointer w-10 h-10 p-2 rounded-md hover:bg-orange-500 active:bg-orange-500"
                                onClick={handleHomeClick}
                            />
                            <FaPeopleGroup
                                className="cursor-pointer w-10 h-10 p-2 rounded-md hover:bg-orange-500 active:bg-orange-500"
                                onClick={handleCommunitiesClick}
                            />
                            <FaUserLarge
                                className="cursor-pointer w-9 h-9 p-2 rounded-md hover:bg-orange-500 active:bg-orange-500"
                                onClick={handleProfileClick}
                            />
                            <FaCog
                                className="cursor-pointer w-9 h-9 p-2 text-white rounded-md hover:bg-orange-500 active:bg-orange-500"
                                onClick={handleSettingClick} />
                        </div>

                        <div className="relative w-full lg:w-[400px]">
                            <input
                                type="text"
                                className="px-4 py-1 rounded-md text-black focus:outline-none w-full"
                                placeholder="Type Here to Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
                        <FaBell
                            className="cursor-pointer w-9 h-9 p-2 rounded-md hover:bg-orange-500 active:bg-orange-500"
                            onClick={handleNotificationClick} />
                        <button
                            onClick={handleSignInClick}
                            className="bg-orange-500 px-4 py-2 rounded-md w-full lg:w-auto"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={handleSignUpClick}
                            className="bg-orange-500 px-4 py-2 rounded-md w-full lg:w-auto"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </header>

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
