import { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa6"; // Added FaStar
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Header from '../components/Header';

function Profile() {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        // Simulate an API call
        fetch('/api/profile') // Replace with your actual API endpoint
            .then((response) => response.json())
            .then((data) => setProfileData(data));
    }, []);

    //if (!profileData) return <p>Loading...</p>;

    return (
        <div className="bg-white-100 text-white font-sans min-h-screen flex flex-col">
            {/* Header */}
            <Header />

            {/* Profile Page Content */}
            <div className="text-black mt-10 flex flex-col lg:flex-row w-full lg:w-1/2 min-h-[800px] container mx-auto p-8">
                <main className="flex-1 bg-white rounded-lg p-8">
                    <div className="flex flex-col items-center lg:flex-row lg:items-start mb-6">
                        {/* Profile Picture */}
                        <img
                            src="./images/Profile.jpg"
                            alt="Profile"
                            className="w-24 h-24 rounded-full object-cover mb-4 lg:mb-0 lg:mr-4"
                        />
                        {/* Profile Info */}
                        <div className="text-center lg:text-left">
                            <h2 className="text-3xl font-semibold mt-6">My Profile</h2>
                            <span className="text-gray-600 flex items-center">
                                <FaStar className="text-yellow-400 mr-1" /> 100 Points
                            </span>
                        </div>

                        <button
                            onClick={() => navigate('/edit-profile')}
                            className="lg:ml-auto bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
                        >
                            Edit Profile
                        </button>
                    </div>

                    {/* Profile Fields */}
                    <div className="space-y-4">

                        {/* Bio */}
                        <div>
                            <label className="block text-gray-700 font-medium">Bio</label>
                            <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-100">
                                Hello!
                            </p>
                        </div>

                        {/* Username */}
                        <div>
                            <label className="block text-gray-700 font-medium">Username</label>
                            <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-100">
                                Leman
                            </p>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 font-medium">Email</label>
                            <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-100">
                                lemansuleymanova@gmail.com
                            </p>
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-gray-700 font-medium">Address</label>
                            <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-100">
                                Ganclik m/s, Ziya Bunyadzade.
                            </p>
                        </div>

                        {/* Contact Number */}
                        <div>
                            <label className="block text-gray-700 font-medium">Contact Number</label>
                            <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-100">
                                +994123456789
                            </p>
                        </div>

                        {/* City */}
                        <div>
                            <label className="block text-gray-700 font-medium">City</label>
                            <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-100">
                                Baku
                            </p>
                        </div>
                        
                        {/* Department */}
                        <div>
                            <label className="block text-gray-700 font-medium">My Department</label>
                            <p className="w-full p-2 border border-gray-300 rounded-md bg-gray-100">
                                ITE
                            </p>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}

export default Profile;
