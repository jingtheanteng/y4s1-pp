import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Header from '../Components/Header';
import { useTheme } from './ThemeContext';

function Setting() {
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!(token && user));
    }, []);

    const handleEditProfileClick = () => {
        navigate('/edit-profile');
    };

    const handleLogOutClick = () => {
        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleSignInClick = () => {
        navigate('/loginregister');
    };

    return (
        <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
            <Header />

            <div className={`flex flex-1 container mx-auto p-6 ${theme === "dark" ? "text-white" : "text-black"}`}>
                <main className="flex-1">
                    <h1 className={`text-3xl font-semibold mb-6 ${theme === "dark" ? "text-white" : "text-black"}`}>
                        Setting
                    </h1>

                    <div className="space-y-6">
                        <div className={`p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                            <h2 className={`text-xl font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>Theme</h2>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => toggleTheme("light")}
                                    className={`px-4 py-2 rounded-md ${theme === "light" ? 'bg-orange-500 text-white' : theme === "dark" ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}
                                >
                                    Light
                                </button>
                                <button
                                    onClick={() => toggleTheme("dark")}
                                    className={`px-4 py-2 rounded-md ${theme === "dark" ? 'bg-orange-500 text-white' : theme === "dark" ? 'bg-gray-700 text-white' : 'bg-gray-200'}`}
                                >
                                    Dark
                                </button>
                            </div>
                        </div>

                        {isLoggedIn ? (
                            <>
                                <div className={`p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                                    <h2 className={`text-xl font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>Account</h2>
                                    <button
                                        onClick={handleEditProfileClick}
                                        className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                                    >
                                        Edit Account
                                    </button>
                                </div>

                                <div className={`p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                                    <h2 className={`text-xl font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>Log Out</h2>
                                    <button
                                        onClick={handleLogOutClick}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className={`p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                                <h2 className={`text-xl font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-black"}`}>Sign In</h2>
                                <button
                                    onClick={handleSignInClick}
                                    className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
                                >
                                    Sign In
                                </button>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Setting;
