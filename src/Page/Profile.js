import { useEffect, useState } from 'react';
import { FaStar, FaPenToSquare, FaTrash } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Header from '../Components/Header';
import { useTheme } from './ThemeContext';
import { validateSession } from '../utils/auth';

function Profile() {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
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
                        
                        // Fetch user's posts
                        const postsResponse = await fetch(`http://localhost:5001/post?owner_id=${currentUser.id}`);
                        const postsData = await postsResponse.json();
                        if (postsData.status === true) {
                            setUserPosts(postsData.data);
                        }
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

    const handleLogOutClick = () => {
        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleEditPost = (postId) => {
        navigate(`/edit-post/${postId}`);
    };

    const handleDeletePost = async (postId) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (!user) {
                    throw new Error('User not logged in');
                }

                const response = await fetch(`http://localhost:5001/post/${postId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        owner_id: user.id
                    }),
                });

                const data = await response.json();
                if (data.status) {
                    // Remove the deleted post from the state
                    setUserPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
                    alert('Post deleted successfully');
                } else {
                    throw new Error(data.message || 'Failed to delete post');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
                alert(error.message);
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
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

                            <div className="mt-6">
                                <button
                                    onClick={handleLogOutClick}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
                                >
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </main>
                </div>

                {/* User's Posts Section */}
                <div className="mt-8 w-full lg:w-1/2 container mx-auto">
                    <h3 className={`text-2xl font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        My Posts
                    </h3>
                    <div className="space-y-4">
                        {userPosts.length === 0 ? (
                            <p className={`text-center ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                You haven't created any posts yet.
                            </p>
                        ) : (
                            userPosts.map(post => (
                                <div
                                    key={post.id}
                                    className={`p-4 rounded-lg shadow-md ${
                                        theme === "dark" ? "bg-gray-800" : "bg-white"
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className={`text-lg font-semibold ${
                                            theme === "dark" ? "text-white" : "text-gray-900"
                                        }`}>
                                            {post.name}
                                        </h4>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleEditPost(post.id)}
                                                className="text-blue-500 hover:text-blue-600"
                                            >
                                                <FaPenToSquare />
                                            </button>
                                            <button
                                                onClick={() => handleDeletePost(post.id)}
                                                className="text-red-500 hover:text-red-600"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                    <p className={`mb-2 ${
                                        theme === "dark" ? "text-gray-300" : "text-gray-600"
                                    }`}>
                                        {post.description}
                                    </p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className={`${
                                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                                        }`}>
                                            {formatDate(post.created_at)}
                                        </span>
                                        <div className="flex items-center space-x-4">
                                            <span className={`${
                                                theme === "dark" ? "text-gray-400" : "text-gray-500"
                                            }`}>
                                                {post.like_count} likes
                                            </span>
                                            <span className={`${
                                                theme === "dark" ? "text-gray-400" : "text-gray-500"
                                            }`}>
                                                {post.comment_count} comments
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
