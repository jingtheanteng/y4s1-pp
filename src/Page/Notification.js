import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Header from '../components/Header';

function Notification() {
    const navigate = useNavigate();

    //const handlePostClick = (postId) => {
    //    navigate(`/post-detail/${postId}`); // Navigate to post detail page with postId
    //};

    const handlePostClick = (postId) => {
        navigate('/post-detail'); // Navigate to post detail page with postId
    };

    return (
        <div className="bg-white-900 text-white font-sans min-h-screen flex flex-col">
            {/* Header */}
            <Header />

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
