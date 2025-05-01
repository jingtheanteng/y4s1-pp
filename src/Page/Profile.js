import { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Header from '../Components/Header';
import { useTheme } from './ThemeContext';
import { validateSession } from '../utils/auth';

function Profile() {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const { theme } = useTheme();

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                // Validate session
                const session = await validateSession();
                if (!session.valid) {
                    if (session.banned) {
                        alert('This account has been banned');
                    }
                    navigate('/loginregister');
                    return;
                }

                // Get all users and find the current user
                const userResponse = await fetch('http://localhost:5001/user');
                const userData = await userResponse.json();

                if (userData.status === 'success' && userData.data) {
                    const currentUser = userData.data.find(user => user.id === session.user_id);
                    if (currentUser) {
                        console.log('Profile Data:', currentUser); // Debug log
                        console.log('Profile Picture:', currentUser.profile_picture); // Debug log
                        setProfileData(currentUser);
                        // Update the user data in localStorage
                        localStorage.setItem('user', JSON.stringify(currentUser));
                    }
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
                navigate('/loginregister');
            }
        };

        fetchProfileData();

        // Set up an interval to refresh the profile data every 5 seconds
        const intervalId = setInterval(fetchProfileData, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, [navigate]);

    const getFieldValue = (value) => {
        return value || 'N/A';
    };

    return (
        <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
            <Header />
            <div className="flex-1 container mx-auto p-6">
                <div className="mt-10 flex flex-col lg:flex-row w-full lg:w-1/2 min-h-[800px] container mx-auto p-8">
                    <main className={`flex-1 rounded-lg p-8 shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
                        <div className="flex flex-col items-center lg:flex-row lg:items-start mb-6">
                            <img
                                src={profileData?.profile_picture && profileData.profile_picture !== 'null' && profileData.profile_picture !== 'undefined'
                                    ? profileData.profile_picture
                                    : "./images/default-profile.jpg"}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover mb-4 lg:mb-0 lg:mr-4"
                                onError={(e) => {
                                    console.log('Image load error:', e);
                                    e.target.src = "./images/default-profile.jpg";
                                }}
                            />
                            <div className="text-center lg:text-left">
                                <h2 className={`text-3xl font-semibold mt-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    {profileData ? getFieldValue(profileData.name) : 'Loading...'}
                                </h2>
                                <span className={`flex items-center ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                    <FaStar className="text-yellow-400 mr-1" /> {profileData && typeof profileData.points !== 'undefined' ? profileData.points : 0} Points
                                </span>
                            </div>

                            <button
                                onClick={() => navigate('/edit-profile')}
                                className="lg:ml-auto bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md transition-colors"
                            >
                                Edit Profile
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className={`block font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Bio</label>
                                <p className={`w-full p-2 border rounded-md ${
                                    theme === "dark"
                                    ? "bg-gray-700 text-gray-300 border-gray-600"
                                    : "bg-gray-100 text-gray-900 border-gray-300"
                                }`}>
                                    {profileData ? getFieldValue(profileData.bio) : 'Loading...'}
                                </p>
                            </div>

                            <div>
                                <label className={`block font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Username</label>
                                <p className={`w-full p-2 border rounded-md ${
                                    theme === "dark"
                                    ? "bg-gray-700 text-gray-300 border-gray-600"
                                    : "bg-gray-100 text-gray-900 border-gray-300"
                                }`}>
                                    {profileData ? getFieldValue(profileData.name) : 'Loading...'}
                                </p>
                            </div>

                            <div>
                                <label className={`block font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Email</label>
                                <p className={`w-full p-2 border rounded-md ${
                                    theme === "dark"
                                    ? "bg-gray-700 text-gray-300 border-gray-600"
                                    : "bg-gray-100 text-gray-900 border-gray-300"
                                }`}>
                                    {profileData ? getFieldValue(profileData.email) : 'Loading...'}
                                </p>
                            </div>

                            <div>
                                <label className={`block font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Address</label>
                                <p className={`w-full p-2 border rounded-md ${
                                    theme === "dark"
                                    ? "bg-gray-700 text-gray-300 border-gray-600"
                                    : "bg-gray-100 text-gray-900 border-gray-300"
                                }`}>
                                    {profileData ? getFieldValue(profileData.address) : 'Loading...'}
                                </p>
                            </div>

                            <div>
                                <label className={`block font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Contact Number</label>
                                <p className={`w-full p-2 border rounded-md ${
                                    theme === "dark"
                                    ? "bg-gray-700 text-gray-300 border-gray-600"
                                    : "bg-gray-100 text-gray-900 border-gray-300"
                                }`}>
                                    {profileData ? getFieldValue(profileData.phone) : 'Loading...'}
                                </p>
                            </div>

                            <div>
                                <label className={`block font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>City</label>
                                <p className={`w-full p-2 border rounded-md ${
                                    theme === "dark"
                                    ? "bg-gray-700 text-gray-300 border-gray-600"
                                    : "bg-gray-100 text-gray-900 border-gray-300"
                                }`}>
                                    {profileData ? getFieldValue(profileData.city) : 'Loading...'}
                                </p>
                            </div>
                            
                            <div>
                                <label className={`block font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>My Department</label>
                                <p className={`w-full p-2 border rounded-md ${
                                    theme === "dark"
                                    ? "bg-gray-700 text-gray-300 border-gray-600"
                                    : "bg-gray-100 text-gray-900 border-gray-300"
                                }`}>
                                    {profileData ? getFieldValue(profileData.department) : 'Loading...'}
                                </p>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Profile;
