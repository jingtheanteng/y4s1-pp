import React, { useState, useEffect } from 'react';
import { FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { CgAttachment } from "react-icons/cg";
import { RiArrowDropDownLine } from "react-icons/ri";
import '../App.css';
import Header from '../components/Header';

function Home() {
    const [likedCards, setLikedCards] = useState([]);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch(`${API_URL}/post`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            if (data.status) {
                setPosts(data.data);
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

    const toggleHeart = (index) => {
        const newLikedCards = [...likedCards];
        newLikedCards[index] = !newLikedCards[index]; // Toggle the liked state for the clicked card
        setLikedCards(newLikedCards); // Update the state to trigger a re-render
    };

    return (
        <div className="bg-white-900 text-white font-sans min-h-screen flex flex-col">
            {/* Header */}
            <Header />

            {/* Forum Title */}
            <h1 className="text-3xl font-bold text-center text-black mt-4">
                Welcome to RUPP Forum
            </h1>

            {/* Main Layout (Sidebar + Content) */}
            <div className="flex flex-col lg:flex-row container mx-auto p-6 flex-1 space-y-6 lg:space-y-0 lg:space-x-6">
                {/* Sidebar Section */}
                <div className="h-1/2 w-full lg:w-1/4 bg-gray-800 p-4 rounded-md space-y-6">
                    {/* Sidebar 1 */}
                    <aside className="bg-gray-900 p-4 rounded-md">
                        <button className="text-left text-xl font-semibold mb-4 text-white bg-gray-800 p-2 rounded-md hover:bg-orange-600 focus:outline-none w-full">
                            Newest and Recent
                            <p className="text-sm font-normal text-gray-300 mt-1">Find the latest update</p>
                        </button>
                        <button className="text-left text-xl font-semibold mb-2 text-white bg-gray-800 p-2 rounded-md hover:bg-orange-600 focus:outline-none w-full">
                            Trending
                            <p className="text-sm font-normal text-gray-300 mt-1">Shots featured today by curators</p>
                        </button>
                    </aside>


                    {/* Sidebar 2 */}
                    <aside className="bg-gray-900 p-4 rounded-md">
                        <h3 className="text-xl font-semibold mb-4">Pinned Communities</h3>
                        <ul>
                            <li className="mb-2">
                                <button className="w-full text-left px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-white">
                                    Department of IT
                                </button>
                            </li>
                            <li className="mb-2">
                                <button className="w-full text-left px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-white">
                                    Department of Computer Science
                                </button>
                            </li>
                            <li className="mb-2">
                                <button className="w-full text-left px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-white">
                                    Department of English
                                </button>
                            </li>
                        </ul>
                    </aside>


                    {/* Sidebar 3 */}
                    <aside className="bg-gray-900 p-4 rounded-md">
                        <h3 className="text-xl font-semibold mb-4">Popular Communities</h3>
                        <ul>
                            <li className="mb-2">
                                <button className="w-full text-left px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-white">
                                    Software Engineering
                                </button>
                            </li>
                            <li className="mb-2">
                                <button className="w-full text-left px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-white">
                                    Information Technolog
                                </button>
                            </li>
                            <li className="mb-2">
                                <button className="w-full text-left px-4 py-2 rounded-md bg-gray-800 hover:bg-gray-700 text-white">
                                    Data Science
                                </button>
                            </li>
                        </ul>
                    </aside>
                </div>
                
                
                {/* Main Content */}
                <main className="flex-1">
                <div className="bg-gray-800 p-4 rounded-md mb-6 flex flex-col items-start">
                <div className="flex items-center mb-4 w-full">
                    <img
                        src="/images/profile.jpg"
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full"
                    />
                    <input
                        type="text"
                        placeholder="Let's share what you're passionate about..."
                        className="flex-1 p-3 bg-gray-700 rounded-md text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 ml-4"
                    />
                    <button className="ml-4 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
                        Create Post
                    </button>
                </div>

                <div className="flex items-center space-x-4 w-full">
                    {/* Attachment Section */}
                    <div>
                    <label for="file-upload" class="flex items-center cursor-pointer bg-white border border-black rounded-md p-2 text-black text-md">
                    <CgAttachment className="h-5 w-5 mr-2" />
                        Attachment
                    </label>
                    <input type="file" id="file-upload" class="hidden" />
                    </div>

                    
                    <div className="relative w-auto">
                        <select className="appearance-none text-black p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 w-full pr-10">
                            <option value="" disabled selected>
                            Select Community
                            </option>
                            <option>Department ITE</option>
                            <option>Department History</option>
                            <option>Department Korea</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <RiArrowDropDownLine className="w-5 h-5 text-gray-500" />
                        </div>
                    </div>
                </div>
            </div>

                    {/* Post Cards */}
                    <div className="space-y-4">
                        {loading ? (
                            <div className="text-center text-gray-400">Loading posts...</div>
                        ) : error ? (
                            <div className="text-center text-red-500">{error}</div>
                        ) : (
                            posts.map((post, index) => (
                                <div
                                    key={post.id}
                                    className="bg-gray-800 p-4 rounded-xl shadow-md flex flex-col space-y-3"
                                    onClick={() => navigate(`/post-detail/${post.id}`)}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex space-x-2">
                                            <h3 className="text-lg font-semibold text-white mb-1">
                                                {post.name}
                                            </h3>
                                        </div>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleHeart(index);
                                            }} 
                                            className="text-gray-400 hover:text-orange-500"
                                        >
                                            <FaHeart className={`text-xl ${likedCards[index] ? 'text-orange-500' : 'text-gray-400'}`} />
                                        </button>
                                    </div>

                                    <span className="text-gray-300 text-xs bg-gray-700 px-2 py-1 rounded-md w-fit">
                                        #{post.department_name}
                                    </span>

                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src="/images/profile.jpg"
                                                alt="User Avatar"
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div>
                                                <p className="text-white text-sm font-semibold">
                                                    {post.owner_name}
                                                </p>
                                                <p className="text-gray-400 text-xs">
                                                    {new Date(post.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-6 text-gray-400 text-sm">
                                            <span>{post.like_count} Likes</span>
                                            <span>{post.comment_count} Comments</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center space-x-2 mt-6">
                        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md">
                            Prev
                        </button>
                        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md">
                            1
                        </button>
                        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md">
                            2
                        </button>
                        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md">
                            Next
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Home;
