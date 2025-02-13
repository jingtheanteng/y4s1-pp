import { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa6"; // Added FaStar
import { FaSearch} from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';

function Profile() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const location = useLocation(); // Detect current location
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        // Simulate an API call
        fetch('/api/profile') // Replace with your actual API endpoint
            .then((response) => response.json())
            .then((data) => setProfileData(data));
    }, []);

    //if (!profileData) return <p>Loading...</p>;

    const handleSignInClick = () => navigate('/loginregister');
    const handleHomeClick = () => navigate('/');
    const handleCommunitiesClick = () => navigate('/communities');
    const handleProfileClick = () => navigate('/profile');
    const handleSettingClick = () => navigate('/setting');
    const handleNotificationClick = () => navigate('/notification');

    const isProfile = location.pathname === '/profile';

    return (
        <div className="bg-white-100 text-white font-sans min-h-screen flex flex-col">
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
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleCommunitiesClick}>Communities</span>
                                        <span className={`block cursor-pointer p-2 ${isProfile ? 'text-orange-500' : 'hover:text-orange-500'}`} onClick={handleProfileClick}>Profile</span>
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleSettingClick}>Settings</span>
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleNotificationClick}>Notifications</span>
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleSignInClick}>Sign In</span>
                                    </div>
                                )}
                            </div>
                            {/* Regular buttons for larger screens */}
                            <div className="hidden lg:flex items-center justify-between w-full lg:w-auto mb-4 lg:mb-0 space-x-8">
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleHomeClick}>Home</span>
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleCommunitiesClick}>Communities</span>
                                <span className={`cursor-pointer text-lg font-bold ${isProfile ? 'text-orange-500' : 'hover:text-orange-500'}`} onClick={handleProfileClick}>Profile</span>
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
