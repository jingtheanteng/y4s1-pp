import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEye, FaEyeSlash, FaSearch, FaBell, FaCog } from "react-icons/fa"; // Added icons
import { FaUserLarge, FaPeopleGroup } from "react-icons/fa6";
import { MdEmail, MdHomeFilled } from "react-icons/md";
import '../App.css';

const LoginRegister = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false); // State for toggling password visibility
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for toggling confirm password visibility
    const [searchTerm, setSearchTerm] = useState(""); // State for search input
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Simulating successful login
        const isAuthenticated = true; // Replace with actual authentication logic
        
        if (isAuthenticated) {
            console.log("Logging in...");
            navigate('/home-loggedin'); // Navigate to /home-loggedin
        } else {
            console.log("Login failed.");
            alert("Invalid credentials. Please try again.");
        }
    };
    

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible); // Toggle password visibility
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible); // Toggle confirm password visibility
    };

    const handleHomeClick = () => {
        navigate('/'); // Navigate to the /Home route
    };

    const handleCommunitiesClick = () => {
        navigate('/communities');  // Navigate to /Home when the home icon is clicked
    };

    const handleProfileClick = () => {
        navigate('/profile');  // Navigate to /Home when the home icon is clicked
    };

    const handleSettingClick = () => {
        navigate('/setting');  // Navigate to /Home when the home icon is clicked
    };

    const handleNotificationClick = () => {
        navigate('/notification');  // Navigate to /Home when the home icon is clicked
    };

    return (
        <div className="bg-white-500 text-white font-sans min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-700 p-4 sticky-header">
                <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                        <img src="logo.png" alt="Knowledgechain" className="w-10 h-10" />
                        <span className="text-2xl font-bold text-white">Knowledgechain</span>
                    </div>

                    {/* Search input between icons */}
                    <div className="flex flex-col lg:flex-row items-center space-x-0 lg:space-x-12 w-full lg:w-auto">
                        <div className="flex items-center justify-between w-full lg:w-auto mb-4 lg:mb-0 space-x-8">
                            <MdHomeFilled 
                                onClick={handleHomeClick} // Add onClick handler for navigation
                                className="cursor-pointer w-10 h-10 p-2 rounded-md hover:bg-orange-500 active:bg-orange-500" 
                            />
                            <FaPeopleGroup 
                            className="cursor-pointer w-10 h-10 p-2 rounded-md hover:bg-orange-500 active:bg-orange-500"
                            onClick={handleCommunitiesClick}
                            />
                            <FaUserLarge 
                            className="cursor-pointer w-9 h-9 p-2 rounded-md hover:bg-orange-500 active:bg-orange-500"
                            onClick={handleProfileClick}
                            />
                            <FaCog 
                            className="cursor-pointer w-9 h-9 p-2 text-white rounded-md hover:bg-orange-500 active:bg-orange-500"
                            onClick={handleSettingClick}/>
                        </div>
                        
                        <div className="relative w-full lg:w-[400px]">
                            <input
                                type="text"
                                className="px-4 py-1 rounded-md text-black focus:outline-none w-full"
                                placeholder="Type Here to Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
                        <FaBell 
                        className="cursor-pointer w-9 h-9 p-2 rounded-md hover:bg-orange-500 active:bg-orange-500"
                        onClick={handleNotificationClick}/>
                    </div>
                </div>
            </header>


            <div className="flex justify-center items-center flex-grow">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg overflow-auto">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800">Welcome to Our Page</h2>
                        <p className="text-gray-600 mt-2">Login or Sign up to access your account</p>
                    </div>
                    <div className="mt-6">
                        <div className="flex justify-around">
                            <button
                                onClick={() => setIsSignUp(false)}
                                className={`w-1/2 py-2 border-b-2 ${!isSignUp ? 'border-orange-500 text-orange-500' : 'text-gray-600'}`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setIsSignUp(true)}
                                className={`w-1/2 py-2 border-b-2 ${isSignUp ? 'border-orange-500 text-orange-500' : 'text-gray-600'}`}
                            >
                                Sign Up
                            </button>
                        </div>
                        <div className="mt-6">
                            <div className="flex flex-col min-h-[500px]">
                                <form onSubmit={handleSubmit} className="flex-grow flex flex-col justify-center items-center">
                                    {isSignUp && (
                                        <div className="mb-4 w-full">
                                            <div className="relative mt-1">
                                                <FaUserLarge className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                                <input
                                                    id="username"
                                                    type="text"
                                                    name="username"
                                                    className="block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black"
                                                    placeholder="Username"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="mb-4 w-full">
                                        <div className="relative mt-1">
                                            <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                className="block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black"
                                                placeholder="Email"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-4 w-full">
                                        <div className="relative mt-1">
                                            <RiLockPasswordLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                            <input
                                                id="password"
                                                type={passwordVisible ? "text" : "password"}
                                                name="password"
                                                className="block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black"
                                                placeholder="Password"
                                                required
                                            />
                                            <div
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                                onClick={togglePasswordVisibility}
                                            >
                                                {passwordVisible ? (
                                                    <FaEyeSlash className="text-gray-500" />
                                                ) : (
                                                    <FaEye className="text-gray-500" />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {!isSignUp && (
                                        <div className="mb-4 w-full text-left">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent form submission
                                                navigate('/forget-password'); // Navigate to the forgot password route
                                            }}
                                            className="text-sm text-orange-500 hover:text-orange-700"
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>
                                    )}

                                    {isSignUp && (
                                        <div className="mb-6 w-full">
                                            <div className="relative mt-1">
                                                <RiLockPasswordLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                                <input
                                                    id="confirmPassword"
                                                    type={confirmPasswordVisible ? "text" : "password"} // Toggle based on confirmPasswordVisible state
                                                    name="confirmPassword"
                                                    className="block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-black"
                                                    placeholder="Confirm Password"
                                                    required
                                                />
                                                <div
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                                    onClick={toggleConfirmPasswordVisibility}
                                                >
                                                    {confirmPasswordVisible ? (
                                                        <FaEyeSlash className="text-gray-500" />
                                                    ) : (
                                                        <FaEye className="text-gray-500" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                  
                                    <button
                                        type="submit"
                                        className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-md shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    >
                                        {isSignUp ? 'Sign Up' : 'Log In'}
                                    </button>

                                    <p className="mt-4 text-sm text-gray-600 text-center">
                                        By signing in with an account, you agree to SO's <button className="text-orange-500 hover:text-orange-700" onClick={() => navigate('/terms')}>Terms of Service</button> and <button className="text-orange-500 hover:text-orange-700" onClick={() => navigate('/privacy')}>Privacy Policy</button>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginRegister;
