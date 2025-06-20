import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgAttachment } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import '../App.css';
import Header from '../Components/Header';
import { useTheme } from './ThemeContext';
import { validateSession } from '../utils/auth';

function Home() {
    const [likedCards, setLikedCards] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [categories, setCategories] = useState([]);
    const [pinnedDepartments, setPinnedDepartments] = useState([]);
    const [popularDepartments, setPopularDepartments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('created_at');
    const [newPost, setNewPost] = useState({
        name: '',
        description: '',
        department_id: '',
        category_id: '',
        attachments: []
    });
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
    const { theme } = useTheme();

    useEffect(() => {
        fetchPosts();
        fetchDepartments();
        fetchCategories();
        fetchPinnedDepartments();
        fetchPopularDepartments();
    }, [currentPage, sortBy]);

    const fetchDepartments = async () => {
        try {
            const response = await fetch(`${API_URL}/department`);
            if (!response.ok) {
                throw new Error('Failed to fetch departments');
            }
            const data = await response.json();
            if (data.status) {
                setDepartments(data.data);
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            console.error('Error fetching departments:', err);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${API_URL}/category`);
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

    const fetchPinnedDepartments = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) return;

            const response = await fetch(`${API_URL}/department/pinned/${user.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch pinned departments');
            }
            const data = await response.json();
            if (data.status) {
                setPinnedDepartments(data.data);
            }
        } catch (err) {
            console.error('Error fetching pinned departments:', err);
        }
    };

    const fetchPopularDepartments = async () => {
        try {
            const response = await fetch(`${API_URL}/department/popular`);
            if (!response.ok) {
                throw new Error('Failed to fetch popular departments');
            }
            const data = await response.json();
            if (data.status) {
                setPopularDepartments(data.data);
            }
        } catch (err) {
            console.error('Error fetching popular departments:', err);
        }
    };

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${API_URL}/post?page=${currentPage}&limit=3&sort_by=${sortBy}&sort_order=DESC`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            if (data.status) {
                setPosts(data.data);
                if (data.pagination) {
                    setTotalPages(data.pagination.total_pages);
                }
                setLikedCards(new Array(data.data.length).fill(false));
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            setError(err.message);
            console.error('Error fetching posts:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreatePost = async () => {
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

            // Validate required fields
            if (!newPost.category_id) {
                alert('Please select a category');
                return;
            }
            if (!newPost.department_id) {
                alert('Please select a community');
                return;
            }
            if (!newPost.name.trim()) {
                alert('Please enter a post title');
                return;
            }

            const formData = new FormData();
            formData.append('name', newPost.name);
            formData.append('description', newPost.description);
            formData.append('department_id', newPost.department_id);
            formData.append('category_id', newPost.category_id);
            formData.append('owner_id', session.user_id);
            
            // Append each file with the correct field name 'files'
            newPost.attachments.forEach((file) => {
                formData.append('files', file); // ✅ Each file is appended individually
            });

            const response = await fetch('http://localhost:5001/post', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to create post');
            }

            const data = await response.json();
            if (data.status) {
                // Reset form and refresh posts
                setNewPost({
                    name: '',
                    description: '',
                    department_id: '',
                    category_id: '',
                    attachments: []
                });
                setCurrentPage(1); // Reset to first page after creating new post
                fetchPosts();

                // Show success message with points earned
                alert(`Post created successfully! You earned ${data.data.points - (data.data.points - 5)} points!`);

                // Refresh user data to update points
                const userResponse = await fetch('http://localhost:5001/user');
                const userData = await userResponse.json();
                if (userData.status === 'success' && userData.data) {
                    const currentUser = userData.data.find(user => user.id === session.user_id);
                    if (currentUser) {
                        // Update the user data in localStorage
                        localStorage.setItem('user', JSON.stringify(currentUser));
                    }
                }
            } else {
                throw new Error(data.message || 'Failed to create post');
            }
        } catch (err) {
            console.error('Error creating post:', err);
            alert(err.message);
        }
    };

    const toggleHeart = (index) => {
        const newLikedCards = [...likedCards];
        newLikedCards[index] = !newLikedCards[index];
        setLikedCards(newLikedCards);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
        const MAX_FILES = 5;
        const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

        // Filter and validate files
        const validFiles = files.filter(file => {
            if (file.size > MAX_FILE_SIZE) {
                alert(`File ${file.name} is too large. Maximum size is 5MB`);
                return false;
            }
            if (!ALLOWED_TYPES.includes(file.type)) {
                alert(`File ${file.name} is not an allowed file type`);
                return false;
            }
            return true;
        });

        // Check number of files
        if (newPost.attachments.length + validFiles.length > MAX_FILES) {
            alert(`You can only upload up to ${MAX_FILES} files`);
            return;
        }

        // Add all valid files to existing attachments
        if (validFiles.length > 0) {
            setNewPost(prev => ({
                ...prev,
                attachments: [...prev.attachments, ...validFiles]
            }));
        }
    };

    const removeAttachment = (indexToRemove) => {
        setNewPost(prev => ({
            ...prev,
            attachments: prev.attachments.filter((_, index) => index !== indexToRemove)
        }));
    };

    return (
        <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
            <Header />

            <div className="flex-1 container mx-auto p-6">
                {/* Forum Title */}
                <h1 className={`text-3xl font-bold text-center mt-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Welcome to RUPP Forum
                </h1>

                {/* Main Layout (Sidebar + Content) */}
                <div className="flex flex-col lg:flex-row container mx-auto p-6 flex-1 space-y-6 lg:space-y-0 lg:space-x-6">
                    {/* Sidebar Section */}
                    <div className={`h-1/2 w-full lg:w-1/4 ${theme === "dark" ? "bg-gray-800" : "bg-white"} p-4 rounded-md space-y-6 shadow-lg`}>
                        {/* Sidebar 1 */}
                        <aside className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-50"} p-4 rounded-md`}>
                            <button 
                                onClick={() => {
                                    setSortBy('created_at');
                                    setCurrentPage(1);
                                }}
                                className={`text-left text-xl font-semibold mb-4 ${theme === "dark" ? "text-white bg-gray-800 hover:bg-gray-700" : "text-gray-900 bg-white hover:bg-gray-100"} p-2 rounded-md focus:outline-none w-full transition-colors`}>
                                Newest and Recent
                                <p className={`text-sm font-normal ${theme === "dark" ? "text-gray-300" : "text-gray-600"} mt-1`}>Find the latest update</p>
                            </button>
                            <button 
                                onClick={() => {
                                    setSortBy('trending');
                                    setCurrentPage(1);
                                }}
                                className={`text-left text-xl font-semibold mb-2 ${theme === "dark" ? "text-white bg-gray-800 hover:bg-gray-700" : "text-gray-900 bg-white hover:bg-gray-100"} p-2 rounded-md focus:outline-none w-full transition-colors`}>
                                Trending
                                <p className={`text-sm font-normal ${theme === "dark" ? "text-gray-300" : "text-gray-600"} mt-1`}>Most engaged posts by likes and comments</p>
                            </button>
                        </aside>

                        {/* Sidebar 2 */}
                        <aside className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-50"} p-4 rounded-md`}>
                            <h3 className={`text-xl font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Pinned Communities</h3>
                            <ul>
                                {pinnedDepartments.length > 0 ? (
                                    pinnedDepartments.map((department) => (
                                        <li key={department.id} className="mb-2">
                                            <button 
                                                onClick={() => navigate(`/department-community/${department.id}`)}
                                                className={`w-full text-left px-4 py-2 rounded-md ${theme === "dark" ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-white hover:bg-gray-100 text-gray-900"} transition-colors`}
                                            >
                                                {department.name}
                                                {department.faculty_name && (
                                                    <span className={`text-xs ml-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                        ({department.faculty_name})
                                                    </span>
                                                )}
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <li className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                        No pinned communities yet
                                    </li>
                                )}
                            </ul>
                        </aside>

                        {/* Sidebar 3 */}
                        <aside className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-50"} p-4 rounded-md`}>
                            <h3 className={`text-xl font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Popular Communities</h3>
                            <ul>
                                {popularDepartments.length > 0 ? (
                                    popularDepartments.map((department) => (
                                        <li key={department.id} className="mb-2">
                                            <button 
                                                onClick={() => navigate(`/department-community/${department.id}`)}
                                                className={`w-full text-left px-4 py-2 rounded-md ${theme === "dark" ? "bg-gray-800 hover:bg-gray-700 text-white" : "bg-white hover:bg-gray-100 text-gray-900"} transition-colors`}
                                            >
                                                {department.name}
                                                {department.faculty_name && (
                                                    <span className={`text-xs ml-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                        ({department.faculty_name})
                                                    </span>
                                                )}
                                                <span className={`text-xs ml-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                    {department.post_count} posts
                                                </span>
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <li className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                        No popular communities yet
                                    </li>
                                )}
                            </ul>
                        </aside>
                    </div>
                    
                    {/* Main Content */}
                    <main className="flex-1">
                        <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} p-4 rounded-md mb-6 flex flex-col items-start shadow-lg`}>
                            <div className="flex items-center mb-4 w-full">
                                {/* User avatar for new post */}
                                {(() => {
                                    const user = JSON.parse(localStorage.getItem('user'));
                                    if (user && user.profile_picture) {
                                        return (
                                            <img
                                                src={user.profile_picture.startsWith('data:image') ? user.profile_picture : `http://localhost:5001/uploads/${user.profile_picture}`}
                                                alt="User Avatar"
                                                className="w-10 h-10 rounded-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = "/images/default-profile.jpg";
                                                }}
                                            />
                                        );
                                    } else {
                                        return (
                                            <img
                                                src="/images/default-profile.jpg"
                                                alt="User Avatar"
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        );
                                    }
                                })()}
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Let's share what you're passionate about..."
                                    value={newPost.name}
                                    onChange={handleInputChange}
                                    className={`flex-1 p-3 ml-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                                        theme === "dark" 
                                        ? "bg-gray-700 text-white placeholder-gray-400" 
                                        : "bg-gray-50 text-gray-900 placeholder-gray-500"
                                    }`}
                                />
                                <button 
                                    onClick={handleCreatePost}
                                    className="ml-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
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
                                        theme === "dark" 
                                        ? "bg-gray-700 text-white placeholder-gray-400" 
                                        : "bg-gray-50 text-gray-900 placeholder-gray-500"
                                    }`}
                                    rows="3"
                                />
                                
                                {/* Attachment pills section */}
                                {newPost.attachments.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {newPost.attachments.map((file, index) => (
                                            <div 
                                                key={index} 
                                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                                                    theme === "dark" 
                                                    ? "bg-gray-700 text-gray-200" 
                                                    : "bg-gray-100 text-gray-700"
                                                }`}
                                            >
                                                <CgAttachment className="h-4 w-4" />
                                                <span className="truncate max-w-[150px]">{file.name}</span>
                                                <button
                                                    onClick={() => removeAttachment(index)}
                                                    className={`p-0.5 rounded-full hover:bg-opacity-80 ${
                                                        theme === "dark" 
                                                        ? "hover:bg-gray-600" 
                                                        : "hover:bg-gray-200"
                                                    }`}
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center space-x-4 w-full">
                                <div>
                                    <label htmlFor="file-upload" className={`flex items-center cursor-pointer rounded-md p-2 text-md ${
                                        theme === "dark"
                                        ? "bg-gray-700 text-white border-gray-600"
                                        : "bg-white text-gray-900 border-gray-300"
                                    } border`}>
                                        <CgAttachment className="h-5 w-5 mr-2" />
                                        Add Attachments
                                    </label>
                                    <input 
                                        type="file" 
                                        id="file-upload" 
                                        className="hidden" 
                                        onChange={handleFileChange}
                                        multiple
                                    />
                                </div>

                                <div className="relative w-auto">
                                    <select 
                                        name="category_id"
                                        value={newPost.category_id}
                                        onChange={handleInputChange}
                                        required
                                        className={`appearance-none p-2 rounded-md focus:ring-2 focus:ring-orange-500 w-full pr-10 ${
                                            theme === "dark"
                                            ? "bg-gray-700 text-white border-gray-600"
                                            : "bg-white text-gray-900 border-gray-300"
                                        } border ${!newPost.category_id ? 'border-red-500' : ''}`}
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
                                        <RiArrowDropDownLine className={`w-5 h-5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                    </div>
                                </div>

                                <div className="relative w-auto">
                                    <select 
                                        name="department_id"
                                        value={newPost.department_id}
                                        onChange={handleInputChange}
                                        required
                                        className={`appearance-none p-2 rounded-md focus:ring-2 focus:ring-orange-500 w-full pr-10 ${
                                            theme === "dark"
                                            ? "bg-gray-700 text-white border-gray-600"
                                            : "bg-white text-gray-900 border-gray-300"
                                        } border ${!newPost.department_id ? 'border-red-500' : ''}`}
                                    >
                                        <option value="" disabled>
                                            Select Community
                                        </option>
                                        {departments.map(department => (
                                            <option key={department.id} value={department.id}>
                                                {department.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <RiArrowDropDownLine className={`w-5 h-5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Post Cards */}
                        <div className="space-y-4">
                            {loading ? (
                                <div className={`text-center ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Loading posts...</div>
                            ) : error ? (
                                <div className="text-center text-red-500">{error}</div>
                            ) : posts.length === 0 ? (
                                <div className={`text-center ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>No posts found</div>
                            ) : (
                                posts.map((post, index) => (
                                    <div
                                        key={post.id}
                                        className={`p-4 rounded-xl shadow-lg flex flex-col space-y-3 cursor-pointer ${
                                            theme === "dark"
                                            ? "bg-gray-800 hover:bg-gray-700"
                                            : "bg-white hover:bg-gray-50"
                                        }`}
                                        onClick={() => navigate(`/post-detail/${post.id}`)}
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex space-x-2">
                                                <h3 className={`text-lg font-semibold mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                                    {post.name}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="flex space-x-2">
                                            {post.department_name && (
                                                <span className={`text-xs px-2 py-1 rounded-md w-fit ${
                                                    theme === "dark"
                                                    ? "bg-gray-700 text-gray-300"
                                                    : "bg-gray-100 text-gray-600"
                                                }`}>
                                                    #{post.department_name}
                                                </span>
                                            )}
                                            {post.category_name && (
                                                <span className={`text-xs px-2 py-1 rounded-md w-fit ${
                                                    theme === "dark"
                                                    ? "bg-gray-700 text-gray-300"
                                                    : "bg-gray-100 text-gray-600"
                                                }`}>
                                                    #{post.category_name}
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center space-x-3">
                                                {post.profile_picture ? (
                                                    <img
                                                        src={post.profile_picture.startsWith('data:image') ? post.profile_picture : `http://localhost:5001/uploads/${post.profile_picture}`}
                                                        alt="User Avatar"
                                                        className="w-10 h-10 rounded-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src = "./images/default-profile.jpg";
                                                        }}
                                                    />
                                                ) : (
                                                    <img
                                                        src="./images/default-profile.jpg"
                                                        alt="User Avatar"
                                                        className="w-10 h-10 rounded-full object-cover"
                                                    />
                                                )}
                                                <div>
                                                    <p className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                                        {post.owner_name}
                                                    </p>
                                                    <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
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

                                            <div className={`flex items-center space-x-6 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                                <span>{post.like_count} Likes</span>
                                                <span>{post.comment_count} Comments</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Pagination */}
                        {posts.length > 0 && (
                            <div className="flex justify-center items-center space-x-4 mt-6">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 rounded-md transition-colors ${
                                        theme === "dark"
                                        ? `bg-gray-700 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'} text-white`
                                        : `bg-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} text-gray-900 border border-gray-300`
                                    }`}
                                >
                                    Prev
                                </button>
                                <span className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 rounded-md transition-colors ${
                                        theme === "dark"
                                        ? `bg-gray-700 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-600'} text-white`
                                        : `bg-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'} text-gray-900 border border-gray-300`
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Home;