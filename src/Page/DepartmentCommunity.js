import React, { useState, useEffect } from 'react';
import { FaHeart } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import { CgAttachment } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import '../App.css';
import Header from '../components/Header';
import { useTheme } from './ThemeContext';

function DepartmentCommunity() {
    const { theme } = useTheme();
    const [likedCards, setLikedCards] = useState({});
    const [posts, setPosts] = useState([]);
    const [department, setDepartment] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newPost, setNewPost] = useState({
        name: '',
        description: '',
        department_id: '',
        category_id: ''
    });
    const navigate = useNavigate();
    const { departmentId } = useParams();

    useEffect(() => {
        fetchDepartmentPosts();
        fetchDepartmentDetails();
        fetchCategories();
    }, [departmentId]);

    const fetchDepartmentPosts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/post?department_id=${departmentId}`);
            const result = await response.json();
            
            if (result.status) {
                setPosts(result.data);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    };

    const fetchDepartmentDetails = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/department/${departmentId}`);
            const result = await response.json();
            
            if (result.status) {
                setDepartment(result.data);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Failed to fetch department details');
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/category`);
            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }
            const data = await response.json();
            if (data.status) {
                setCategories(data.data);
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            console.error('Error fetching categories:', err);
        }
    };

    const toggleHeart = (postId) => {
        setLikedCards(prevState => ({
            ...prevState,
            [postId]: !prevState[postId]
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreatePost = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                throw new Error('User not logged in');
            }

            if (!newPost.category_id) {
                throw new Error('Please select a category');
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...newPost,
                    department_id: departmentId,
                    owner_id: user.id
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            const data = await response.json();
            if (data.status) {
                setNewPost({
                    name: '',
                    description: '',
                    department_id: '',
                    category_id: ''
                });
                fetchDepartmentPosts();
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            console.error('Error creating post:', err);
            alert(err.message);
        }
    };

    return (
        <div className={`flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} text-${theme === 'dark' ? 'white' : 'black'} font-sans`}>
            <Header />

            {/* Main Content */}
            <div className="container mx-auto py-8 px-4 lg:px-12">
                <h1 className={`text-${theme === 'dark' ? 'white' : 'black'} text-center text-3xl font-bold mb-6`}>
                    {department ? department.name : 'Loading...'}
                </h1>

                {/* Create Post Section */}
                <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} p-4 rounded-md mb-6 flex flex-col items-start`}>
                    <div className="flex items-center mb-4 w-full">
                        {(() => {
                            const user = JSON.parse(localStorage.getItem('user'));
                            return user?.profile_picture ? (
                                <img
                                    src={`http://localhost:5001/uploads/${user.profile_picture}`}
                                    alt="User Avatar"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-500 text-xs">No Photo</span>
                                </div>
                            );
                        })()}
                        <input
                            type="text"
                            name="name"
                            placeholder="Let's share what you're passionate about..."
                            value={newPost.name}
                            onChange={handleInputChange}
                            className={`flex-1 p-3 ${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-white text-gray-800'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ml-4`}
                        />
                        <button 
                            onClick={handleCreatePost}
                            className="ml-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                        >
                            Create Post
                        </button>
                    </div>

                    <div className="w-full mb-4">
                        <textarea
                            name="description"
                            placeholder="Add more details about your post..."
                            value={newPost.description}
                            onChange={handleInputChange}
                            className={`w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                                theme === 'dark' 
                                ? 'bg-gray-700 text-gray-300 placeholder-gray-400' 
                                : 'bg-white text-gray-800 placeholder-gray-500'
                            }`}
                            rows="3"
                        />
                    </div>

                    <div className="flex items-center space-x-4 w-full">
                        <div>
                            <label htmlFor="file-upload" className={`flex items-center cursor-pointer rounded-md p-2 text-md ${
                                theme === 'dark'
                                ? 'bg-gray-700 text-white border-gray-600'
                                : 'bg-white text-gray-900 border-gray-300'
                            } border`}>
                                <CgAttachment className="h-5 w-5 mr-2" />
                                Attachment
                            </label>
                            <input type="file" id="file-upload" className="hidden" />
                        </div>

                        <div className="relative w-auto">
                            <select 
                                name="category_id"
                                value={newPost.category_id}
                                onChange={handleInputChange}
                                className={`appearance-none p-2 rounded-md focus:ring-2 focus:ring-orange-500 w-full pr-10 ${
                                    theme === 'dark'
                                    ? 'bg-gray-700 text-white border-gray-600'
                                    : 'bg-white text-gray-900 border-gray-300'
                                } border`}
                            >
                                <option value="" disabled>
                                    Select Category
                                </option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <RiArrowDropDownLine className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Posts Section */}
                {loading ? (
                    <div className={`text-center text-${theme === 'dark' ? 'white' : 'black'}`}>Loading posts...</div>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : posts.length === 0 ? (
                    <div className={`text-center text-${theme === 'dark' ? 'white' : 'black'}`}>No posts yet in this department</div>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-4 rounded-xl shadow-md flex flex-col space-y-3`}
                                onClick={() => navigate(`/post-detail/${post.id}`)}
                            >
                                <div className="flex justify-between items-center">
                                    <div className="flex space-x-2">
                                        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'} mb-1`}>
                                            {post.name}
                                        </h3>
                                    </div>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleHeart(post.id);
                                        }} 
                                        className="text-gray-400 hover:text-orange-500"
                                    >
                                        <FaHeart className={`text-xl ${likedCards[post.id] ? 'text-orange-500' : 'text-gray-400'}`} />
                                    </button>
                                </div>

                                <span className={`${theme === 'dark' ? 'text-gray-300 bg-gray-700' : 'text-gray-600 bg-gray-100'} text-xs px-2 py-1 rounded-md w-fit`}>
                                    #{post.category_name}
                                </span>

                                <div className="flex items-center space-x-3">
                                    {post.profile_picture ? (
                                        <img
                                            src={`http://localhost:5001/uploads/${post.profile_picture}`}
                                            alt="User Avatar"
                                            className="w-10 h-10 rounded-full cursor-pointer object-cover"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/viewprofile/${post.owner_id}`);
                                            }}
                                        />
                                    ) : (
                                        <div 
                                            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/viewprofile/${post.owner_id}`);
                                            }}
                                        >
                                            <span className="text-gray-500 text-xs">No Photo</span>
                                        </div>
                                    )}
                                    <div>
                                        <p className={`${theme === 'dark' ? 'text-white' : 'text-black'} text-sm font-semibold`}>
                                            {post.owner_name}
                                        </p>
                                        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-xs`}>
                                            {new Date(new Date(post.created_at).getTime() + 7 * 60 * 60 * 1000).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                timeZone: 'Asia/Phnom_Penh'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className={`flex items-center space-x-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
                                    <span>{post.like_count} Likes</span>
                                    <span>{post.comment_count} Comments</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DepartmentCommunity;

