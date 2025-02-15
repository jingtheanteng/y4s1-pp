import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Header from '../components/Header';

function Setting() {
    const [theme, setTheme] = useState("light");
    const navigate = useNavigate();

    useEffect(() => {
        // Set the theme when the component is mounted
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme); // Update theme state
    };

    const handleEditProfileClick = () => {
        navigate('/edit-profile'); // Navigate to edit-profile page
    };

    const handleLogOutClick = () => {
        // Perform logout logic here (clear session, token, etc.)
        // Example:
        // localStorage.removeItem('user');
        // sessionStorage.clear();
        
        navigate('/'); // Redirect to the home page after logging out
    };

    return (
        <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
            {/* Header */}
            <Header />

            {/* Main Layout */}
            <div className="text-black flex flex-1 container mx-auto p-6">
                {/* Main Content */}
                <main className="flex-1">
                <h1 className={`text-${theme === 'dark' ? 'white' : 'black'} text-3xl font-semibold mb-6`}>
                    Setting
                </h1>

                    {/* Settings Section */}
                    <div className="space-y-6">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Theme</h2>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => handleThemeChange("light")}
                                    className={`px-4 py-2 rounded-md ${theme === "light" ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                                >
                                    Light
                                </button>
                                <button
                                    onClick={() => handleThemeChange("dark")}
                                    className={`px-4 py-2 rounded-md ${theme === "dark" ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}
                                >
                                    Dark
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Account</h2>
                            <button
                                onClick={handleEditProfileClick}
                                className="bg-orange-500 text-white px-4 py-2 rounded-md"
                            >
                                Edit Account
                            </button>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-semibold mb-4">Log Out</h2>
                            <button
                                onClick={handleLogOutClick} // Use the new logout handler
                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Setting;
