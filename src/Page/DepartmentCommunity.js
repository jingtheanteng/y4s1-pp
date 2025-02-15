import React, { useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { useNavigate} from 'react-router-dom';
import { CgAttachment } from "react-icons/cg";
import '../App.css';
import Header from '../components/Header';

function DepartmentCommunity() {
    const [likedCards, setLikedCards] = useState([false, false, false, false]); // Array to track heart icons for each card
    const navigate = useNavigate();


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
            Department ITE
            </h1>

            {/* Main Layout (Sidebar + Content) */}
            <div className="flex flex-col lg:flex-row container mx-auto p-6 flex-1 space-y-6 lg:space-y-0 lg:space-x-6">

                {/* Main Content */}
                <main className="flex-1 max-w-6xl mx-auto p-4">
                <div className="bg-gray-800 p-4 rounded-md mb-6 flex flex-col items-start">
                    <div className="flex items-center mb-4 w-full">
                        <img
                            src="./images/Profile.jpg"
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full "
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

                        <select className="text-black p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 w-auto">
                            <option value="" disabled selected>Select Community</option>
                            <option>Department ITE</option>
                            <option>Department History</option>
                            <option>Department Korea</option>
                        </select>
                    </div>
                </div>

                {/* Post Cards */}
                <div className="space-y-4">
                    {[...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 p-4 rounded-xl shadow-md flex flex-col space-y-3"
                            onClick={() => navigate('/post-detail')}
                        >
                            {/* Post Title */}
                            <div className="flex justify-between items-center">
                                <div className="flex space-x-2">
                                    <h3 className="text-lg font-semibold text-white mb-1">
                                        OnePay - Online Payment Processing Web App - Download from uihut.com
                                    </h3>
                                </div>
                                {/* Heart Icon */}
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent click event from bubbling up to the parent card
                                        toggleHeart(index);
                                    }} 
                                    className="text-gray-400 hover:text-orange-500"
                                >
                                    <FaHeart className={`text-xl ${likedCards[index] ? 'text-orange-500' : 'text-gray-400'}`} />
                                </button>
                            </div>

                            {/* Tag Section */}
                            <span className="text-gray-300 text-xs bg-gray-700 px-2 py-1 rounded-md w-fit">
                                #Department ITE
                            </span>

                            {/* User Info & Stats */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src="/images/profile.jpg"
                                        alt="User Avatar"
                                        className="w-10 h-10 rounded-full cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent the event from bubbling to the card
                                            navigate('/view-profile');
                                        }}
                                    />
                                    <div>
                                        <p className="text-white text-sm font-semibold">
                                            Teng Jingthean
                                        </p>
                                        <p className="text-gray-400 text-xs">1 week ago</p>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="flex items-center space-x-6 text-gray-400 text-sm">
                                    <span>601,066 Views</span>
                                    <span>24,753 Likes</span>
                                    <span>209 Comments</span>
                                </div>
                            </div>
                        </div>
                    ))}
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

export default DepartmentCommunity;
