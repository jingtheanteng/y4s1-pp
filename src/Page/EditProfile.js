import React, { useState } from 'react';
import { FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import '../App.css';
import Header from '../components/Header';

function EditProfile() {
    const [profilePicture, setProfilePicture] = useState("./images/default-profile.jpg");
    const navigate = useNavigate();

    const handleProfilePictureClick = () => {
        document.getElementById('fileInput').click(); // Trigger file input on image click
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result); // Set the selected image as the new profile picture
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-white-100 text-white font-sans min-h-screen flex flex-col">
            {/* Header */}
            <Header />

            {/* Profile Page Content */}
            <div className="text-black mt-10 flex flex-col lg:flex-row w-full lg:w-1/2 min-h-[800px] container mx-auto p-8">
                <main className="flex-1 bg-white rounded-lg p-8">
                    <div className="flex flex-col items-center lg:flex-row lg:items-start mb-6">
                        {/* Profile Picture */}
                        <div onClick={handleProfilePictureClick} className="cursor-pointer">
                            <img
                                src={profilePicture}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover mb-4 lg:mb-0 lg:mr-4"
                            />
                        </div>
                        {/* Profile Info */}
                        <div className="text-center lg:text-left">
                            <h2 className="text-3xl font-semibold mt-6">Edit Profile</h2>
                            <span className="text-gray-600 flex items-center">
                                <FaStar className="text-yellow-400 mr-1" /> 100 Points
                            </span>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium">Bio</label>
                            <input
                                type="text"
                                placeholder="Hello"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Username */}
                        <div>
                            <label className="block text-gray-700 font-medium">Username</label>
                            <input
                                type="text"
                                placeholder="Leman"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 font-medium">Email</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="lemansuleymanova@gmail.com"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span className="text-green-500 text-xl">✔</span>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-gray-700 font-medium">Address</label>
                            <input
                                type="text"
                                placeholder="Ganclik m/s, Ziya Bunyadzade."
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Contact Number */}
                        <div>
                            <label className="block text-gray-700 font-medium">Contact Number</label>
                            <input
                                type="text"
                                placeholder="+994123456789"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* City */}
                        <div className="relative">
                            <label className="block text-gray-700 font-medium">City</label>
                            <select
                                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 appearance-none"
                            >
                                <option>Choose Your City</option>
                                <option>Baku</option>
                                <option>Ganja</option>
                                <option>Sumqayit</option>
                            </select>
                            <span className="absolute top-1/2 right-2 transform text-gray-500 pointer-events-none">
                            <RiArrowDropDownLine size={24} />
                            </span>
                        </div>

                        {/* Department */}
                        <div className="relative">
                            <label className="block text-gray-700 font-medium">My Department</label>
                            <select
                                className="w-full px-2 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 appearance-none"
                            >
                                <option>Choose Your Department</option>
                                <option>ITE</option>
                                <option>Data Science</option>
                                <option>History</option>
                            </select>
                            <span className="absolute top-1/2 right-2 transform text-gray-500 pointer-events-none">
                            <RiArrowDropDownLine size={24} />
                            </span>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-4 mt-4">
                            <button 
                                onClick={() => navigate('/profile')}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => navigate('/profile')}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </main>
            </div>

            {/* Hidden File Input */}
            <input
                type="file"
                id="fileInput"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
            />
        </div>
    );
}

export default EditProfile;
