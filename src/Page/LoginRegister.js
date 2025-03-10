import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Added icons
import { FaUserLarge} from "react-icons/fa6";
import { MdEmail} from "react-icons/md";
import '../App.css';
import Header from '../components/Header';

const LoginRegister = () => {
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    const [isSignUp, setIsSignUp] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false); // State for toggling password visibility
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // State for toggling confirm password visibility
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });
    const [registerInfo, setRegisterInfo] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (isSignUp) {
                // Validate registration data
                if (registerInfo.password !== registerInfo.confirmPassword) {
                    alert("Passwords don't match");
                    return;
                }
                
                // Make API call to register the user
                const response = await fetch(`${API_URL}/user/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: registerInfo.email,
                        password: registerInfo.password,
                    }),
                });
                
                const data = await response.json();
                
                if (data.status) {
                    console.log("Registration successful:", data);
                    alert("Registration successful! Please log in.");
                    setIsSignUp(false); // Switch to login form
                } else {
                    console.log("Registration failed:", data.message);
                    alert(data.message || "Registration failed. Please try again.");
                }
            } else {
                // Login logic
                console.log(loginInfo);
                const response = await fetch(`${API_URL}/user/authenticate`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: loginInfo.email,
                        password: loginInfo.password
                    }),
                });
                
                const data = await response.json();
                
                if (data.status) {
                    console.log("Login successful:", data);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    localStorage.setItem('token', data.session.token);
                    
                    // Show success message
                    alert("Login successful! Welcome back.");
                    
                    // Redirect to home page
                    navigate('/');
                } else {
                    console.log("Login failed:", data.message);
                    alert(data.message || "Invalid credentials. Please try again.");
                }
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            alert("An error occurred. Please try again later.");
        }
    };
    

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible); // Toggle password visibility
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible); // Toggle confirm password visibility
    };

    return (
        <div className="bg-white-500 text-white font-sans min-h-screen flex flex-col">
            {/* Header */}
            <Header />


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
                                                    value={registerInfo.username}
                                                    onChange={handleRegisterChange}
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
                                                value={isSignUp ? registerInfo.email : loginInfo.email}
                                                onChange={isSignUp ? handleRegisterChange : handleLoginChange}
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
                                                value={isSignUp ? registerInfo.password : loginInfo.password}
                                                onChange={isSignUp ? handleRegisterChange : handleLoginChange}
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
                                                    type={confirmPasswordVisible ? "text" : "password"}
                                                    name="confirmPassword"
                                                    value={registerInfo.confirmPassword}
                                                    onChange={handleRegisterChange}
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
