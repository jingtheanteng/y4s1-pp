import React, { useState } from 'react';
import { FaSearch, FaBell } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleSignInClick = () => navigate('/loginregister');
    const handleHomeClick = () => navigate('/');
    const handleCommunitiesClick = () => navigate('/communities');
    const handleProfileClick = () => navigate('/profile');
    const handleSettingClick = () => navigate('/setting');
    const handleNotificationClick = () => navigate('/notification');

    // Check current location for active state
    const isHome = location.pathname === '/' || location.pathname === '/home-loggedin';
    const isCommunities = location.pathname === '/communities';
    const isProfile = location.pathname === '/profile';
    const isSetting = location.pathname === '/setting';
    const isNotification = location.pathname === '/notification';
    const isSignIn = location.pathname === '/loginregister';
    
    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleLogout = () => {
        // Perform logout actions
        alert("Logged out successfully!");
    };

    return (
            <header className="bg-blue-700 p-4 sticky-header">
                <div className="container mx-auto flex flex-col lg:flex-row items-center">
                    {/* Logo */}
                    <div className="flex items-center lg:w-1/6 lg:mb-0">
                        <img src="./images/Logo.png" alt="Knowledgechain" className="w-12 h-12" />
                    </div>

                    {/* Navigation - Center Section */}
                    <div className="flex flex-col lg:flex-row items-center lg:w-4/6 justify-center">
                        <div className="relative w-full lg:w-auto mb-4 lg:mb-0">
                            {/* Dropdown for smaller screens */}
                            <div className="lg:hidden">
                                <button className="text-lg font-bold bg-blue-700 text-white px-4 py-2 rounded-md" onClick={() => setMenuOpen(!menuOpen)}>
                                    Menu
                                </button>
                                {menuOpen && (
                                    <div className="absolute left-1/2 transform -translate-x-1/2 bg-white text-black rounded-md shadow-lg mt-2 w-full">
                                        <span className={`block cursor-pointer p-2 ${isHome ? 'text-orange-500' : 'hover:text-orange-500'}`} onClick={handleHomeClick}>Home</span>
                                        <span className={`block cursor-pointer p-2 ${isCommunities ? 'text-orange-500' : 'hover:text-orange-500'}`} onClick={handleCommunitiesClick}>Communities</span>
                                        <span className={`block cursor-pointer p-2 ${isProfile ? 'text-orange-500' : 'hover:text-orange-500'}`} onClick={handleProfileClick}>Profile</span>
                                        <span className={`block cursor-pointer p-2 ${isSetting ? 'text-orange-500' : 'hover:text-orange-500'}`} onClick={handleSettingClick}>Settings</span>
                                        <span className={`block cursor-pointer p-2 ${isSignIn ? 'text-orange-500' : 'hover:text-orange-500'}`}onClick={handleSignInClick}>Sign In</span>
                                    </div>
                                )}
                            </div>
                            {/* Regular buttons for larger screens */}
                            <nav className="hidden lg:flex items-center justify-center space-x-12">
                                <span className={`cursor-pointer text-lg font-bold ${isHome ? 'text-orange-500' : 'text-white hover:text-orange-500'}`} onClick={handleHomeClick}>Home</span>
                                <span className={`cursor-pointer text-lg font-bold ${isCommunities ? 'text-orange-500' : 'text-white hover:text-orange-500'}`} onClick={handleCommunitiesClick}>Communities</span>
                                <span className={`cursor-pointer text-lg font-bold ${isProfile ? 'text-orange-500' : 'text-white hover:text-orange-500'}`} onClick={handleProfileClick}>Profile</span>
                                <span className={`cursor-pointer text-lg font-bold ${isSetting ? 'text-orange-500' : 'text-white hover:text-orange-500'}`} onClick={handleSettingClick}>Settings</span>
                                <span className={`cursor-pointer text-lg font-bold ${isSignIn ? 'text-orange-500' : 'text-white hover:text-orange-500'}`} onClick={handleSignInClick}>Sign In</span>
                            </nav>
                        </div>
                    </div>

                    {/* Search Bar and Profile Section */}
                    <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-9">
                        <FaBell 
                            className={`cursor-pointer w-9 h-9 p-2 rounded-md hover:bg-orange-500 active:bg-orange-500 ${isNotification ? 'text-orange-500' : 'text-white'}`}
                            onClick={handleNotificationClick}
                        />
                        {/* Search Bar */}
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

                        {/* Profile Dropdown - Only show on /home-loggedin */}
                        {location.pathname === '/home-loggedin' && (
                            <div className={`relative ${menuOpen ? 'hidden' : ''}`}>
                                <div
                                    className="bg-blue-500 flex items-center text-white px-7 py-1 rounded-lg shadow-md cursor-pointer"
                                    onClick={toggleDropdown}
                                >
                                    <div className="w-9 h-9 border-2 rounded-full flex items-center justify-center">
                                        <img src="/images/profile.jpg" alt="Profile Icon" className="w-8 h-8 rounded-full" />
                                    </div>
                                </div>

                                {/* Dropdown Menu */}
                                {isDropdownVisible && (
                                    <div className="absolute right-0 mt-4 inline-block min-w-max bg-white text-black shadow-lg rounded-md py-4">
                                        <div className="flex items-center px-4 py-4">
                                            <img src="/images/profile.jpg" alt="User Avatar" className="w-12 h-12 rounded-full mr-4" />
                                            <div>
                                                <p className="font-medium text-lg">Teng Jingthean</p>
                                                <p className="text-sm text-gray-500">tengjingthean@gmail.com</p>
                                            </div>
                                        </div>
                                        <hr className="border-gray-300" />
                                        <button
                                            className="w-full text-left px-6 py-3 text-md hover:bg-gray-200"
                                            onClick={handleLogout}
                                        >
                                            <FaSignOutAlt className="inline-block mr-2" /> Log Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>
    );
}

export default Header;