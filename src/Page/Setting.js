import React, { useState, useEffect } from 'react';
import { FaUserLarge, FaPeopleGroup } from "react-icons/fa6";
import { FaSearch, FaBell, FaCog } from "react-icons/fa";
import { MdHomeFilled } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';

function Setting() {
    const [searchTerm, setSearchTerm] = useState("");
    const [theme, setTheme] = useState("light");
    const navigate = useNavigate();
    const location = useLocation(); // Detect current location

    useEffect(() => {
        // Set the theme when the component is mounted
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

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

    const isSetting = location.pathname === '/setting';

    return (
        <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
            {/* Header */}
            <header className={`p-4 ${theme === "dark" ? "bg-blue-700" : "bg-blue-700"}`}>
                <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0 text-white">
                        <img src="logo.png" alt="Knowledgechain" className="w-10 h-10" />
                        <span className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-white"}`}>Knowledgechain</span>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center space-x-0 lg:space-x-12 w-full lg:w-auto">
                        <div className="flex items-center justify-between w-full lg:w-auto mb-4 lg:mb-0 space-x-8">
                            <MdHomeFilled
                                className={`cursor-pointer w-10 h-10 p-2 rounded-md ${theme === "dark" ? "text-black" : "text-white"} hover:bg-orange-500 active:bg-orange-500`}
                                onClick={handleHomeClick}
                            />
                            <FaPeopleGroup
                                className={`cursor-pointer w-10 h-10 p-2 rounded-md ${theme === "dark" ? "text-black" : "text-white"} hover:bg-orange-500 active:bg-orange-500`}
                                onClick={handleCommunitiesClick}
                            />
                            <FaUserLarge
                                className={`cursor-pointer w-9 h-9 p-2 rounded-md ${theme === "dark" ? "text-black" : "text-white"} hover:bg-orange-500 active:bg-orange-500`}
                                onClick={handleProfileClick}
                            />
                            <FaCog
                                className={`cursor-pointer w-9 h-9 p-2 rounded-md ${isSetting ? 'bg-orange-500' : 'hover:bg-orange-500'} ${theme === "dark" ? "text-black" : "text-white"} active:bg-orange-500`}
                                onClick={handleSettingClick} />
                        </div>

                        <div className="relative w-full lg:w-[400px]">
                            <input
                                type="text"
                                className={`px-4 py-1 rounded-md focus:outline-none w-full ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}`}
                                placeholder="Type Here to Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${theme === "dark" ? "text-white" : "text-gray-500"}`} />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
                        <FaBell
                            className={`cursor-pointer w-9 h-9 p-2 rounded-md ${theme === "dark" ? "text-black" : "text-white"} hover:bg-orange-500 active:bg-orange-500`}
                            onClick={handleNotificationClick} />
                        <button
                            onClick={handleSignInClick}
                            className="bg-orange-500 text-white px-4 py-2 rounded-md w-full lg:w-auto"
                        >
                            Sign In
                        </button>
                        <button
                            onClick={handleSignUpClick}
                            className="bg-orange-500 text-white px-4 py-2 rounded-md w-full lg:w-auto"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </header>

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
