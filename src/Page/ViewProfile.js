import React from 'react';
import { FaStar } from "react-icons/fa6";
import '../App.css';
import Header from '../components/Header';

function ViewProfile() {

    return (
        <div className="bg-white-100 text-white font-sans min-h-screen flex flex-col">
            {/* Header */}
            <Header />

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

                        {/* Department */}
                        <label className="block text-gray-700 font-medium">Department</label>
                        <div className="w-full sm:w-1/2 p-2 border border-gray-300 rounded-md">
                            <p className="text-gray-700 break-words">ITE</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ViewProfile;
