import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import '../App.css';
import Header from '../components/Header';

function Notification() {
    const navigate = useNavigate();
    const { theme } = useTheme();

    const handlePostClick = (postId) => {
        navigate('/post-detail'); // Navigate to post detail page with postId
    };

    return (
        <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
            {/* Header */}
            <Header />

            {/* Main Layout */}
            <div className={`flex-1 container mx-auto p-6 ${theme === "dark" ? "text-white" : "text-black"}`}>
                {/* Notifications Section */}
                <main className="flex-1">
                    <h1 className={`text-3xl font-semibold mb-6 ${theme === "dark" ? "text-white" : "text-black"}`}>Notifications</h1>

                    {/* Notification List */}
                    <div className="space-y-4">
                        <div className={`p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`} onClick={() => handlePostClick(1)}>
                            <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>New Post in Your Pinned Community: Tech Enthusiasts</p>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>A new discussion has been posted in the pinned Tech Enthusiasts community.</p>
                            <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-400"}`}>15 minutes ago</span>
                        </div>

                        <div className={`p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`} onClick={() => handlePostClick(2)}>
                            <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>New Post in Your Pinned Community: Gaming Hub</p>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>The Gaming Hub community has a new post about the upcoming event!</p>
                            <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-400"}`}>2 hours ago</span>
                        </div>

                        <div className={`p-4 rounded-lg shadow-md ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`} onClick={() => handlePostClick(3)}>
                            <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>New Post in Your Pinned Community: Literature Lovers</p>
                            <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>Check out the latest post in Literature Lovers about the book of the month!</p>
                            <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-400"}`}>5 hours ago</span>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Notification;
