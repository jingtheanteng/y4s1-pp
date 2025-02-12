import React from 'react';
import { FaUserLarge, FaPeopleGroup, FaStar } from "react-icons/fa6";
import { FaSearch, FaBell, FaCog } from "react-icons/fa";
import { MdHomeFilled } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

function ViewProfile() {
    const navigate = useNavigate();

    const handleSignInClick = () => navigate('/loginregister');
    const handleSignUpClick = () => navigate('/loginregister');
    const handleHomeClick = () => navigate('/');
    const handleCommunitiesClick = () => navigate('/communities');
    const handleProfileClick = () => navigate('/profile');
    const handleSettingClick = () => navigate('/setting');
    const handleNotificationClick = () => navigate('/notification');

    return (
        <div className="bg-white-100 text-white font-sans min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-700 p-4">
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
                                className="cursor-pointer w-10 h-10 p-2 rounded-md hover:bg-orange-500 active:bg-orange-500"
                                onClick={handleProfileClick}
                            />
                            <FaCog
                                className="cursor-pointer w-9 h-9 p-2 rounded-md hover:bg-orange-500 active:bg-orange-500"
                                onClick={handleSettingClick} />
                        </div>

                        <div className="relative w-full lg:w-[400px]">
                            <input
                                type="text"
                                className="px-4 py-1 rounded-md text-black focus:outline-none w-full"
                                placeholder="Type Here to Search..."
                            />
                            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
                        <FaBell
                            className="cursor-pointer w-9 h-9 p-2 rounded-md hover:bg-orange-500 active:bg-orange-500"
                            onClick={handleNotificationClick} />
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

            {/* Profile Page Content */}
            <div className="text-black mt-10 flex flex-col lg:flex-row w-full lg:w-1/2 min-h-[800px] container mx-auto p-8">
                <main className="space-y-6 flex-1 bg-white rounded-3xl p-8 shadow-xl shadow-black/50">
                    <h2 className="text-black text-3xl font-semibold mt-6 text-center">Profile</h2>
                    <div className="flex flex-col items-center lg:flex-row lg:items-start mb-6">
                        {/* Profile Picture */}
                        <img
                            src="/images/profile.jpg"
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover mb-4 lg:mb-0 lg:mr-4"
                        />
                        {/* Profile Info */}
                        <div className="text-center lg:text-left">
                            <h2 className="text-3xl font-semibold mt-3">Teng JingThean</h2>
                            <span className="text-blue-600 ml-2">012 234 567</span>
                            <span className="flex items-center justify-center lg:justify-start">
                                <FaStar className="text-yellow-400 mr-1" /> 100 Points
                            </span>
                        </div>
                    </div>

                    {/* Display Info with Styled Container */}
                    <div className="space-y-4">
                        {/* Bio */}
                        <div className="w-full">
                            <label className="font-semibold text-2xl">Bio</label>
                            <p className="text-gray-700">Hello</p>
                        </div>

                        {/* Email */}
                        <label className="block text-gray-700 font-medium">Email</label>
                        <div className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-md">
                            <p className="text-gray-700 break-words">lemansuleymanova@gmail.com</p>
                        </div>

                        {/* Address */}
                        <label className="block text-gray-700 font-medium">Address</label>
                        <div className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-md">
                            <p className="text-gray-700 break-words">Ganclik m/s, Ziya Bunyadzade.</p>
                        </div>

                        {/* City */}
                        <label className="block text-gray-700 font-medium">City</label>
                        <div className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-md">
                            <p className="text-gray-700 break-words">Phnom Penh</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ViewProfile;
