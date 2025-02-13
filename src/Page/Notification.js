import React, { useState } from 'react';
import { FaSearch} from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';

function Notification() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const location = useLocation(); // Detect current location

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

    //const handlePostClick = (postId) => {
    //    navigate(`/post-detail/${postId}`); // Navigate to post detail page with postId
    //};

    const handlePostClick = (postId) => {
        navigate('/post-detail'); // Navigate to post detail page with postId
    };

    const isNotification = location.pathname === '/notification';

    return (
        <div className="bg-white-900 text-white font-sans min-h-screen flex flex-col">
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
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleSettingClick}>Settings</span>
                                        <span className={`block cursor-pointer p-2 ${isNotification ? 'text-orange-500' : 'hover:text-orange-500'}`} onClick={handleNotificationClick}>Notifications</span>
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleSignInClick}>Sign In</span>
                                    </div>
                                )}
                            </div>
                            {/* Regular buttons for larger screens */}
                            <div className="hidden lg:flex items-center justify-between w-full lg:w-auto mb-4 lg:mb-0 space-x-8">
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleHomeClick}>Home</span>
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleCommunitiesClick}>Communities</span>
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleProfileClick}>Profile</span>
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleSettingClick}>Settings</span>
                                <span className={`cursor-pointer text-lg font-bold ${isNotification ? 'text-orange-500' : 'hover:text-orange-500'}`} onClick={handleNotificationClick}>Notifications</span>
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
                {/* Notifications Section */}
                <main className="flex-1">
                    <h1 className="text-3xl font-semibold mb-6">Notifications</h1>

                    {/* Notification List */}
                    <div className="space-y-4">
                        <div className="bg-gray-100 p-4 rounded-lg shadow-md" onClick={() => handlePostClick(1)}>
                            <p className="font-semibold">New Post in Your Pinned Community: Tech Enthusiasts</p>
                            <p className="text-sm text-gray-600">A new discussion has been posted in the pinned Tech Enthusiasts community.</p>
                            <span className="text-xs text-gray-400">15 minutes ago</span>
                        </div>

                        <div className="bg-gray-100 p-4 rounded-lg shadow-md" onClick={() => handlePostClick(2)}>
                            <p className="font-semibold">New Post in Your Pinned Community: Gaming Hub</p>
                            <p className="text-sm text-gray-600">The Gaming Hub community has a new post about the upcoming event!</p>
                            <span className="text-xs text-gray-400">2 hours ago</span>
                        </div>

                        <div className="bg-gray-100 p-4 rounded-lg shadow-md" onClick={() => handlePostClick(3)}>
                            <p className="font-semibold">New Post in Your Pinned Community: Literature Lovers</p>
                            <p className="text-sm text-gray-600">Check out the latest post in Literature Lovers about the book of the month!</p>
                            <span className="text-xs text-gray-400">5 hours ago</span>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Notification;
