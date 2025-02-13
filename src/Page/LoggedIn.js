import React, { useState } from 'react';
import { FaSearch, FaBell, FaHeart } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import { CgAttachment } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaSignOutAlt } from 'react-icons/fa';
import '../App.css';

function LoggedIn() {
    const [searchTerm, setSearchTerm] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [likedCards, setLikedCards] = useState([false, false, false, false]); // Array to track heart icons for each card
    const [isDropdownVisible, setDropdownVisible] = useState(false); // Dropdown state
    const navigate = useNavigate();
    const location = useLocation();

    const handleHomeClick = () => {
        navigate('/');
    };

    const handleSignInClick = () => navigate('/loginregister');

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

    const toggleDropdown = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleLogout = () => {
        // Perform logout actions
        alert("Logged out successfully!");
    };

    const isHome = location.pathname === '/home-loggedin';

    const toggleHeart = (index) => {
        const newLikedCards = [...likedCards];
        newLikedCards[index] = !newLikedCards[index]; // Toggle the liked state for the clicked card
        setLikedCards(newLikedCards); // Update the state to trigger a re-render
    };

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
                                        <span className={`block cursor-pointer p-2 ${isHome ? 'text-orange-500' : 'hover:text-orange-500'}`} onClick={handleHomeClick}>Home</span>
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleCommunitiesClick}>Communities</span>
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleProfileClick}>Profile</span>
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleSettingClick}>Settings</span>
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleNotificationClick}>Notifications</span>
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleSignInClick}>Sign In</span>
                                    </div>
                                )}
                            </div>
                            {/* Regular buttons for larger screens */}
                            <div className="hidden lg:flex items-center justify-between w-full lg:w-auto mb-4 lg:mb-0 space-x-8">
                                <span className={`cursor-pointer text-lg font-bold ${isHome ? 'text-orange-500' : 'hover:text-orange-500'}`} onClick={handleHomeClick}>Home</span>
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleCommunitiesClick}>Communities</span>
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleProfileClick}>Profile</span>
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleSettingClick}>Settings</span>
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleNotificationClick}>Notifications</span>
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleSignInClick}>Sign In</span>
                            </div>
                        </div>
                </div>

                    <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-9">
                        <FaBell 
                            className="cursor-pointer w-9 h-9 p-2 rounded-md hover:bg-orange-500 active:bg-orange-500"
                            onClick={handleNotificationClick}
                        />
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

                        <div className={`relative ${menuOpen ? 'hidden' : ''}`}>
                            <div
                                className="flex items-center bg-orange text-white px-7 py-1 rounded-lg shadow-md cursor-pointer"
                                onClick={toggleDropdown}
                            >
                                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                                    <img src="/images/profile.jpg" alt="Profile Icon" className="w-7 h-7 rounded-full" />
                                </div>
                                <p className="ml-3 text-sm font-medium w-[68px] truncate">Teng Jingthean</p>
                                <IoMdArrowDropdown className="ml-2 w-5 h-5 cursor-pointer" />
                            </div>

                        {/* Dropdown Menu */}
                        {isDropdownVisible && (
                        <div className="absolute right-0 mt-4 inline-block min-w-max bg-white text-black shadow-lg rounded-md py-4">
                            <div className="flex items-center px-4 py-4">
                            <img src="/images/profile.jpg" alt="User Avatar" className="w-12 h-12 rounded-full mr-4" />
                            <div>
                                <p className="font-medium text-lg">Teng Jingthean</p> {/* Longer text */}
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
                </div>
            </div>
        </header>

            {/* Forum Title */}
            <h1 className="text-3xl font-bold text-center text-black mt-4">
            Welcome to RUPP Forum
            </h1>

            {/* Main Layout (Sidebar + Content) */}
            <div className="flex flex-col lg:flex-row container mx-auto p-6 flex-1 space-y-6 lg:space-y-0 lg:space-x-6">
                {/* Sidebar Section */}
                <div className="h-1/2 w-full lg:w-1/4 bg-gray-800 p-4 rounded-md space-y-6">
                    {/* Sidebar 1 */}
                    <aside className="bg-gray-900 p-4 rounded-md">
                        <button className="text-left text-xl font-semibold mb-4 text-white bg-gray-800 p-2 rounded-md hover:bg-orange-600 focus:outline-none w-full">
                            Newest and Recent
                            <p className="text-sm font-normal text-gray-300 mt-1">Find the latest update</p>
                        </button>
                        <button className="text-left text-xl font-semibold mb-2 text-white bg-gray-800 p-2 rounded-md hover:bg-orange-600 focus:outline-none w-full">
                            Trending
                            <p className="text-sm font-normal text-gray-300 mt-1">Shots featured today by curators</p>
                        </button>
                    </aside>


                    {/* Sidebar 2 */}
                    <aside className="bg-gray-900 p-4 rounded-md">
                        <h3 className="text-xl font-semibold mb-4">Pinned Communities</h3>
                        <ul>
                            <li className="mb-2">
                                <button className="w-full text-left px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-white">
                                    Department of IT
                                </button>
                            </li>
                            <li className="mb-2">
                                <button className="w-full text-left px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-white">
                                    Department of Computer Science
                                </button>
                            </li>
                            <li className="mb-2">
                                <button className="w-full text-left px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-white">
                                    Department of English
                                </button>
                            </li>
                        </ul>
                    </aside>


                    {/* Sidebar 3 */}
                    <aside className="bg-gray-900 p-4 rounded-md">
                        <h3 className="text-xl font-semibold mb-4">Popular Communities</h3>
                        <ul>
                            <li className="mb-2">
                                <button className="w-full text-left px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-white">
                                    Software Engineering
                                </button>
                            </li>
                            <li className="mb-2">
                                <button className="w-full text-left px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-white">
                                    Information Technolog
                                </button>
                            </li>
                            <li className="mb-2">
                                <button className="w-full text-left px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-white">
                                    Data Science
                                </button>
                            </li>
                        </ul>
                    </aside>
                </div>
                
                
                {/* Main Content */}
                <main className="flex-1">
                <div className="bg-gray-800 p-4 rounded-md mb-6 flex flex-col items-start">
                <div className="flex items-center mb-4 w-full">
                    <img
                        src="/images/profile.jpg"
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full"
                    />
                    <input
                        type="text"
                        placeholder="Let's share what you're passionate about..."
                        className="flex-1 p-3 bg-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 ml-4"
                    />
                    <button className="ml-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
                        Create Post
                    </button>
                </div>

                <div className="flex items-center space-x-4 w-full">
                    {/* Attachment Section */}
                    <div>
                    <label for="file-upload" class="flex items-center cursor-pointer bg-white border border-black rounded-md p-2 text-black text-md">
                    <CgAttachment className="h-5 w-5 mr-2" />
                        Attachment
                    </label>
                    <input type="file" id="file-upload" class="hidden" />
                    </div>

                    
                    <div className="relative w-auto">
                        <select className="appearance-none text-black p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 w-full pr-10">
                            <option value="" disabled selected>
                            Select Community
                            </option>
                            <option>Department ITE</option>
                            <option>Department History</option>
                            <option>Department Korea</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <RiArrowDropDownLine className="w-5 h-5 text-gray-500" />
                        </div>
                    </div>
                </div>
            </div>

                    {/* Post Cards */}
                    <div className="space-y-4">
                        {[...Array(4)].map((_, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 p-4 rounded-xl shadow-md flex flex-col space-y-3"
                                onClick={() => navigate('/post-detail')}
                            >

                                {/* Post Title */}
                                <div className="flex justify-between items-center">
                                    <div className="flex space-x-2">
                                        <h3 className="text-lg font-semibold text-white mb-1">
                                            OnePay - Online Payment Processing Web App - Download from uihut.com
                                        </h3>
                                    </div>
                                    {/* Heart Icon */}
                                {/* Heart Icon */}
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent click event from bubbling up to the parent card
                                        toggleHeart(index);
                                    }} 
                                    className="text-gray-400 hover:text-orange-500"
                                >
                                    <FaHeart className={`text-xl ${likedCards[index] ? 'text-orange-500' : 'text-gray-400'}`} />
                                </button>
                                </div>

                                {/* Tag Section */}
                                <span className="text-gray-300 text-xs bg-gray-700 px-2 py-1 rounded-md w-fit">
                                    #Department ITE
                                </span>

                                {/* User Info & Stats */}
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src="/images/profile.jpg"
                                            alt="User Avatar"
                                            className="w-10 h-10 rounded-full"
                                        />
                                        <div>
                                            <p className="text-white text-sm font-semibold">
                                                Teng Jingthean
                                            </p>
                                            <p className="text-gray-400 text-xs">1 week ago</p>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center space-x-6 text-gray-400 text-sm">
                                        <span>601,066 Views</span>
                                        <span>24,753 Likes</span>
                                        <span>209 Comments</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center space-x-2 mt-6">
                        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md">
                            Prev
                        </button>
                        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md">
                            1
                        </button>
                        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md">
                            2
                        </button>
                        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md">
                            Next
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default LoggedIn;
