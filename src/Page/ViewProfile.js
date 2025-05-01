import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import '../App.css';
import Header from '../Components/Header';
import { useTheme } from './ThemeContext';

function ViewProfile() {
    const { theme } = useTheme();
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            // Check if userId is valid
            if (!userId || isNaN(Number(userId))) {
                setError('Invalid user ID');
                setLoading(false);
                return;
            }

            try {
                console.log('Fetching user with ID:', userId);
                const response = await fetch(`http://localhost:5001/user`);
                const data = await response.json();
                console.log('Response data:', data);
                
                if (data.status === 'success') {
                    // Convert userId to number for comparison
                    const targetId = Number(userId);
                    console.log('Looking for user with ID:', targetId);
                    
                    // Find user in the data array
                    const userData = data.data.find(u => Number(u.id) === targetId);
                    console.log('Found user:', userData);
                    
                    if (userData) {
                        setUser(userData);
                    } else {
                        console.log('Available users:', data.data);
                        setError('User not found');
                    }
                } else {
                    setError('Failed to fetch user data');
                }
            } catch (err) {
                console.error('Error fetching user:', err);
                setError('An error occurred while fetching user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId]);

    if (loading) {
        return (
            <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
                <Header />
                <div className="flex-1 flex justify-center items-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                        <p className="mt-4">Loading profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
                <Header />
                <div className="flex-1 flex justify-center items-center">
                    <div className="text-center">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button 
                            onClick={() => navigate('/')}
                            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
                <Header />
                <div className="flex-1 flex justify-center items-center">
                    <div className="text-center">
                        <p className="mb-4">User not found</p>
                        <button 
                            onClick={() => navigate('/')}
                            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
            <Header />

            <div className="flex-1 flex justify-center items-center px-4 py-8">
                <div className="w-full max-w-3xl">
                    <h1 className={`text-center text-3xl font-bold mb-8 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Profile</h1>
                    
                    <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl shadow-lg p-6 md:p-8`}>
                        <div className="flex flex-col items-center mb-8">
                            {/* Profile Picture */}
                            {user.profile_picture ? (
                                <img
                                    src={`http://localhost:5001/uploads/${user.profile_picture}`}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-orange-500"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4 border-4 border-orange-500">
                                    <span className="text-gray-500 text-sm">No Photo</span>
                                </div>
                            )}
                            {/* Profile Info */}
                            <div className="text-center">
                                <h2 className={`text-2xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    {user.name}
                                </h2>
                                <p className="text-blue-500 font-medium mt-1">{user.phone || 'No phone number'}</p>
                                <div className="flex items-center justify-center mt-2">
                                    <FaStar className="text-yellow-400 mr-2" />
                                    <span className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{user.points || 0} Points</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Bio */}
                            <div>
                                <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Bio</h3>
                                <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{user.bio || 'No bio available'}</p>
                            </div>

                            {/* Email */}
                            <div>
                                <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Email</h3>
                                <div className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                                    {user.email}
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Address</h3>
                                <div className={`p-3 rounded-lg ${theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-50 text-gray-700"}`}>
                                    {user.address || 'No address available'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProfile;
