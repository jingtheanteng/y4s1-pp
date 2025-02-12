import React, { useState } from 'react';
import { FaUserLarge, FaPeopleGroup } from "react-icons/fa6";
import { FaSearch, FaBell, FaCog } from "react-icons/fa";
import { MdHomeFilled } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';

function Notification() {
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
                            className={`cursor-pointer w-9 h-9 p-2 rounded-md ${isNotification ? 'bg-orange-500' : 'hover:bg-orange-500'} active:bg-orange-500`}
                            onClick={handleNotificationClick} />
                        <button
                            onClick={handleSignInClick}
                            className="bg-orange-500 px-4 py-2 rounded-md w-full lg:w-auto"
                        >
                            Sign In
                        </button>
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
