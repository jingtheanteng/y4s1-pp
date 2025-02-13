import React, { useState } from 'react';
import { FaHeart, FaSearch} from "react-icons/fa"; // Added icons
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';

function Communities() {
    const [searchTerm, setSearchTerm] = useState(""); // State for search input
    const [menuOpen, setMenuOpen] = useState(false);
    const [likedCommunities, setLikedCommunities] = useState({}); // Track liked communities
    const navigate = useNavigate();  // Initialize navigate
    const location = useLocation(); // Detect current location
    const [contentsearchTerm, setContentSearchTerm] = useState(""); // State for header search input
    

    const communityData = [
        { name: "Department ITE", faculty: "Faculty of Engineering", todayPosts: 10, totalPosts: 100 },
        { name: "Department of Data Science", faculty: "Faculty of Science", todayPosts: 10, totalPosts: 100 },
        { name: "Department History", faculty: "Faculty of Arts", todayPosts: 10, totalPosts: 100 },
        { name: "Department Korea", faculty: "Faculty of Humanities", todayPosts: 10, totalPosts: 100 },
    ];

    const handleSignInClick = () => navigate('/loginregister');
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
                                        <span className={`block cursor-pointer p-2 ${isCommunities ? 'text-orange-500' : 'hover:text-orange-500'}`} onClick={handleCommunitiesClick}>Communities</span>
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleProfileClick}>Profile</span>
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleSettingClick}>Settings</span>
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleNotificationClick}>Notifications</span>
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleSignInClick}>Sign In</span>
                                    </div>
                                )}
                            </div>
                            {/* Regular buttons for larger screens */}
                            <div className="hidden lg:flex items-center justify-between w-full lg:w-auto mb-4 lg:mb-0 space-x-8">
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleHomeClick}>Home</span>
                                <span className={`cursor-pointer text-lg font-bold ${isCommunities ? 'text-orange-500' : 'hover:text-orange-500'}`} onClick={handleCommunitiesClick}>Communities</span>
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleProfileClick}>Profile</span>
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleSettingClick}>Settings</span>
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
                                <h2 className="text-lg font-semibold mb-6">{community.faculty}</h2>
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
