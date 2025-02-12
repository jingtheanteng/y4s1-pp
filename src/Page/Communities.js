import React, { useState } from 'react';
import { FaUserLarge, FaPeopleGroup } from "react-icons/fa6";
import { FaHeart, FaSearch, FaBell, FaCog } from "react-icons/fa"; // Added icons
import { MdHomeFilled } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';

function Communities() {
    const [searchTerm, setSearchTerm] = useState(""); // State for search input
    const [likedCommunities, setLikedCommunities] = useState({}); // Track liked communities
    const navigate = useNavigate();  // Initialize navigate
    const location = useLocation(); // Detect current location
    const [contentsearchTerm, setContentSearchTerm] = useState(""); // State for header search input

    const communityData = [
        { name: "Department ITE", todayPosts: 10, totalPosts: 100 },
        { name: "Department of Data Science", todayPosts: 10, totalPosts: 100 },
        { name: "Department History", todayPosts: 10, totalPosts: 100 },
        { name: "Department Korea", todayPosts: 10, totalPosts: 100 },
    ];

    const handleSignInClick = () => navigate('/loginregister');
    const handleSignUpClick = () => navigate('/loginregister');
    const handleHomeClick = () => navigate('/');
    const handleCommunitiesClick = () => navigate('/communities');
    const handleProfileClick = () => navigate('/profile');
    const handleSettingClick = () => navigate('/setting');
    const handleNotificationClick = () => navigate('/notification');

    const isCommunities = location.pathname === '/communities';

    const toggleLike = (index) => {
        setLikedCommunities(prevState => ({
            ...prevState,
            [index]: !prevState[index] // Toggle the "liked" state for the specific community
        }));
    };

    return (
        <div className="flex flex-col min-h-screen bg-white-900 text-white font-sans">
            {/* Header */}
            <header className="bg-blue-700 p-4">
                <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                        <img src="logo.png" alt="Knowledgechain" className="w-10 h-10" />
                        <span className="text-2xl font-bold text-white">Knowledgechain</span>
                    </div>

                    {/* Search input between icons */}
                    <div className="flex flex-col lg:flex-row items-center space-x-0 lg:space-x-12 w-full lg:w-auto">
                        <div className="flex items-center justify-between w-full lg:w-auto mb-4 lg:mb-0 space-x-8">
                            <MdHomeFilled 
                                className="cursor-pointer w-10 h-10 p-2 rounded-md hover:bg-orange-500" 
                                onClick={handleHomeClick}
                            />
                            <FaPeopleGroup 
                                className={`cursor-pointer w-10 h-10 p-2 rounded-md ${isCommunities ? 'bg-orange-500' : 'hover:bg-orange-500'} active:bg-orange-500`}
                                onClick={handleCommunitiesClick}
                            />
                            <FaUserLarge 
                                className="cursor-pointer w-9 h-9 p-2 rounded-md hover:bg-orange-500"
                                onClick={handleProfileClick}
                            />
                            <FaCog 
                                className="cursor-pointer w-9 h-9 p-2 rounded-md hover:bg-orange-500"
                                onClick={handleSettingClick}
                            />
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
                            className="cursor-pointer w-9 h-9 p-2 rounded-md hover:bg-orange-500"
                            onClick={handleNotificationClick}
                        />
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


            {/* Page Content */}
            <div className="container mx-auto py-8 px-4 lg:px-12">
                
                <h1 className="text-black text-center text-3xl font-bold mb-6">Find Communities</h1>
                {/* Search Bar */}
                <div className="relative mb-8 mx-auto w-full lg:w-1/2">
                    <input
                        type="text"
                        placeholder="Type here to search..."
                        value={contentsearchTerm}
                        onChange={(e) => setContentSearchTerm(e.target.value)}
                        className="bg-gray-900 h-[50px] w-full px-4 py-2 text-white-900 rounded-md focus:outline-none"
                    />
                    <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>

                {/* Community Cards */}
                <div className="flex justify-center flex-wrap space-y-4 w-full lg:w-1/2 mx-auto">
                    {communityData.map((community, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center bg-gray-800 rounded-2xl p-8 shadow-lg hover:bg-gray-700 w-full"
                            onClick={() => navigate('/department-community')}
                        >
                            <div className="flex flex-col items-center w-full text-center">
                                <h2 className="text-lg font-semibold mb-6">{community.name}</h2>
                                <p className="text-sm text-gray-400">
                                    Today Post: {community.todayPosts} | Total Post: {community.totalPosts}
                                </p>
                            </div>
                            <FaHeart
                            className={`cursor-pointer w-6 h-6 ${likedCommunities[index] ? 'text-orange-500' : 'text-gray-400'}`}
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent navigation when clicking the heart icon
                                toggleLike(index);
                            }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Communities;
