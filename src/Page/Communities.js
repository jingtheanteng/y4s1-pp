import React, { useState, useEffect } from 'react';
import { FaHeart, FaSearch} from "react-icons/fa"; // Added icons
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Header from '../components/Header';

function Communities() {
    const [likedCommunities, setLikedCommunities] = useState({}); // Track liked communities
    const [departments, setDepartments] = useState([]); // New state for departments
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state
    const navigate = useNavigate();  // Initialize navigate
    const [contentsearchTerm, setContentSearchTerm] = useState(""); // State for header search input
    

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/department`);
            const result = await response.json();
            
            if (result.status) {
                setDepartments(result.data);
            } else {
                setError(result.message);
            }
        } catch (err) {
            setError('Failed to fetch departments');
        } finally {
            setLoading(false);
        }
    };

    const toggleLike = (index) => {
        setLikedCommunities(prevState => ({
            ...prevState,
            [index]: !prevState[index] // Toggle the "liked" state for the specific community
        }));
    };

    return (
        <div className="flex flex-col min-h-screen bg-white-900 text-white font-sans">
            {/* Header */}
            <Header />

            {/* Page Content */}
            <div className="container mx-auto py-8 px-4 lg:px-12">
                
                <h1 className="text-black text-center text-3xl font-bold mb-6">Find Communities</h1>
                {/* Search Bar */}
                <div className="relative mb-8 mx-auto w-full lg:w-1/2">
                    <input
                        type="text"
                        placeholder="Type here to search..."
                        value={contentsearchTerm}
                        onChange={(e) => setContentSearchTerm(e.target.value)}
                        className="bg-gray-900 h-[50px] w-full px-4 py-2 text-white-900 rounded-md focus:outline-none"
                    />
                    <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>

                {/* Community Cards */}
                <div className="flex justify-center flex-wrap space-y-4 w-full lg:w-1/2 mx-auto">
                    {loading ? (
                        <p className="text-black">Loading departments...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        departments.map((department, index) => (
                            <div
                                key={department.id}
                                className="flex justify-between items-center bg-gray-800 rounded-2xl p-8 shadow-lg hover:bg-gray-700 w-full"
                                onClick={() => navigate('/department-community')}
                            >
                                <div className="flex flex-col items-center w-full text-center">
                                    <h2 className="text-lg font-semibold mb-6">{department.name}</h2>
                                    <h2 className="text-lg font-semibold mb-6">{department.faculty_name}</h2>
                                    <p className="text-sm text-gray-400">
                                        Created at: {new Date(department.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <FaHeart
                                    className={`cursor-pointer w-6 h-6 ${likedCommunities[department.id] ? 'text-orange-500' : 'text-gray-400'}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleLike(department.id);
                                    }}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Communities;
