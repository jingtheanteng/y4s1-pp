import React, { useState, useEffect } from 'react';
import { FaSearch} from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';

function Setting() {
    const [menuOpen, setMenuOpen] = useState(false);
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
            <header className="bg-blue-700 p-4 sticky-header">
                <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                        <img src="logo.png" alt="Knowledgechain" className="w-10 h-10" />
                    </div>

                    {/* Search input between icons */}
                    <div className="flex flex-col lg:flex-row items-center space-x-0 lg:space-x-12 w-full lg:w-auto">
                        <div className="relative w-full lg:w-auto mb-4 lg:mb-0 flex justify-center">
                            {/* Dropdown for smaller screens */}
                            <div className="lg:hidden">
                                <button className="text-lg font-bold bg-blue-700 text-white px-4 py-2 rounded-md" onClick={() => setMenuOpen(!menuOpen)}>
                                    Menu
                                </button>
                                {menuOpen && (
                                    <div className="absolute left-1/2 transform -translate-x-1/2 bg-white text-black rounded-md shadow-lg mt-2 w-full">
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleHomeClick}>Home</span>
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleCommunitiesClick}>Communities</span>
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleProfileClick}>Profile</span>
                                        <span className={`block cursor-pointer p-2 ${isSetting ? 'text-orange-500' : 'hover:text-orange-500'}`} onClick={handleSettingClick}>Settings</span>
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleNotificationClick}>Notifications</span>
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleSignInClick}>Sign In</span>
                                    </div>
                                )}
                            </div>
                            {/* Regular buttons for larger screens */}
                            <div className="hidden lg:flex items-center justify-between w-full lg:w-auto mb-4 lg:mb-0 space-x-8">
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleHomeClick}>Home</span>
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleCommunitiesClick}>Communities</span>
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleProfileClick}>Profile</span>
                                <span className={`cursor-pointer text-lg font-bold ${isSetting ? 'text-orange-500' : 'hover:text-orange-500'}`} onClick={handleSettingClick}>Settings</span>
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleNotificationClick}>Notifications</span>
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleSignInClick}>Sign In</span>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar moved next to navigation items */}
                    <div className={`flex justify-center mt-4 lg:mt-0 lg:ml-4 ${menuOpen ? 'hidden' : ''}`}>
                        <div className="text-black relative w-full max-w-md">
                            <input
                                type="text"
                                placeholder="Type here to search"
                                className="w-full p-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2">
                                <FaSearch className="text-gray-500" />
                            </button>
                        </div>
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
