import React, { useState, useEffect } from 'react';
import { FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { RiArrowDropDownLine } from "react-icons/ri";
import '../App.css';
import Header from '../components/Header';
import { useTheme } from './ThemeContext';

function EditProfile() {
    const [profilePicture, setProfilePicture] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        email: '',
        address: '',
        phone: '',
        city: '',
        department: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const { theme } = useTheme();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Get session token from localStorage
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/loginregister');
                    return;
                }

                // First validate the session
                const validateResponse = await fetch('http://localhost:5001/session/validate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token })
                });

                const validateData = await validateResponse.json();
                
                if (!validateData.status || !validateData.data.valid) {
                    localStorage.removeItem('token');
                    navigate('/loginregister');
                    return;
                }

                // Get all users and find the current user
                const userResponse = await fetch('http://localhost:5001/user');
                const userData = await userResponse.json();

                if (userData.status === 'success' && userData.data) {
                    const currentUser = userData.data.find(user => user.id === validateData.data.user_id);
                    if (currentUser) {
                        setFormData({
                            name: currentUser.name || '',
                            bio: currentUser.bio || '',
                            email: currentUser.email || '',
                            address: currentUser.address || '',
                            phone: currentUser.phone || '',
                            city: currentUser.city || '',
                            department: currentUser.department || ''
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setError('Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [navigate]);

    const handleProfilePictureClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/loginregister');
                return;
            }

            const response = await fetch('http://localhost:5001/user/update-profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.status === true) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/profile');
                }, 1500);
            } else {
                setError(data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                        <p className={`mt-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Loading profile data...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
            <Header />
            <div className="flex-1 container mx-auto p-6">
                <div className={`mt-10 flex flex-col lg:flex-row w-full lg:w-1/2 min-h-[800px] container mx-auto p-8`}>
                    <main className={`flex-1 rounded-lg p-8 shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                        <div className="flex flex-col items-center lg:flex-row lg:items-start mb-6">
                            <div onClick={handleProfilePictureClick} className="cursor-pointer">
                                <img
                                    src={profilePicture || ''}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-full object-cover mb-4 lg:mb-0 lg:mr-4"
                                    style={{ display: profilePicture ? 'block' : 'none' }}
                                />
                                {!profilePicture && (
                                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4 lg:mb-0 lg:mr-4">
                                        <span className="text-gray-500">No Photo</span>
                                    </div>
                                )}
                            </div>
                            <div className="text-center lg:text-left">
                                <h2 className={`text-3xl font-semibold mt-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    Edit Profile
                                </h2>
                                <span className={`flex items-center ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                    <FaStar className="text-yellow-400 mr-1" /> 100 Points
                                </span>
                            </div>
                        </div>

                        {error && (
                            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                                Profile updated successfully! Redirecting...
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className={`block font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    Bio
                                </label>
                                <input
                                    type="text"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    placeholder="Enter your bio"
                                    className={`w-full p-2 rounded-md focus:ring-2 focus:ring-orange-500 ${
                                        theme === "dark"
                                        ? "bg-gray-700 text-gray-300 border-gray-600 placeholder-gray-400"
                                        : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
                                    } border`}
                                />
                            </div>

                            <div>
                                <label className={`block font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your username"
                                    className={`w-full p-2 rounded-md focus:ring-2 focus:ring-orange-500 ${
                                        theme === "dark"
                                        ? "bg-gray-700 text-gray-300 border-gray-600 placeholder-gray-400"
                                        : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
                                    } border`}
                                />
                            </div>

                            <div>
                                <label className={`block font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email"
                                        className={`w-full p-2 rounded-md focus:ring-2 focus:ring-orange-500 ${
                                            theme === "dark"
                                            ? "bg-gray-700 text-gray-300 border-gray-600 placeholder-gray-400"
                                            : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
                                        } border`}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                        <span className="text-green-500 text-xl">✔</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className={`block font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter your address"
                                    className={`w-full p-2 rounded-md focus:ring-2 focus:ring-orange-500 ${
                                        theme === "dark"
                                        ? "bg-gray-700 text-gray-300 border-gray-600 placeholder-gray-400"
                                        : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
                                    } border`}
                                />
                            </div>

                            <div>
                                <label className={`block font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    Contact Number
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter your phone number"
                                    className={`w-full p-2 rounded-md focus:ring-2 focus:ring-orange-500 ${
                                        theme === "dark"
                                        ? "bg-gray-700 text-gray-300 border-gray-600 placeholder-gray-400"
                                        : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
                                    } border`}
                                />
                            </div>

                            <div className="relative">
                                <label className={`block font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    City
                                </label>
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className={`w-full px-2 py-2 rounded-md focus:ring-2 focus:ring-orange-500 appearance-none ${
                                        theme === "dark"
                                        ? "bg-gray-700 text-gray-300 border-gray-600"
                                        : "bg-white text-gray-900 border-gray-300"
                                    } border`}
                                >
                                    <option value="">Choose Your City</option>
                                    <option value="Phnom Penh">Phnom Penh</option>
                                    <option value="Siem Reap">Siem Reap</option>
                                    <option value="Battambang">Battambang</option>
                                </select>
                                <span className={`absolute top-1/2 right-2 transform pointer-events-none ${
                                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                                }`}>
                                    <RiArrowDropDownLine size={24} />
                                </span>
                            </div>

                            <div className="relative">
                                <label className={`block font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    My Department
                                </label>
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    className={`w-full px-2 py-2 rounded-md focus:ring-2 focus:ring-orange-500 appearance-none ${
                                        theme === "dark"
                                        ? "bg-gray-700 text-gray-300 border-gray-600"
                                        : "bg-white text-gray-900 border-gray-300"
                                    } border`}
                                >
                                    <option value="">Choose Your Department</option>
                                    <option value="ITE">ITE</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="History">History</option>
                                </select>
                                <span className={`absolute top-1/2 right-2 transform pointer-events-none ${
                                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                                }`}>
                                    <RiArrowDropDownLine size={24} />
                                </span>
                            </div>

                            <div className="flex justify-end space-x-4 mt-4">
                                <button 
                                    type="submit"
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => navigate('/profile')}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </main>
                </div>

                <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
}

export default EditProfile;
