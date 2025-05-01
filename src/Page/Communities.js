import React, { useState, useEffect } from 'react';
import { FaHeart, FaSearch} from "react-icons/fa"; // Added icons
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Header from '../Components/Header';
import { useTheme } from './ThemeContext';

function Communities() {
    const { theme } = useTheme();
    const [likedCommunities, setLikedCommunities] = useState({}); // Track liked communities
    const [pinnedDepartments, setPinnedDepartments] = useState({}); // Track pinned departments
    const [departments, setDepartments] = useState([]); // New state for departments
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state
    const navigate = useNavigate();  // Initialize navigate
    const [contentsearchTerm, setContentSearchTerm] = useState(""); // State for header search input
    

    useEffect(() => {
        fetchDepartments();
        fetchPinnedDepartments();
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

    const fetchPinnedDepartments = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) return;

            const response = await fetch(`${process.env.REACT_APP_API_URL}/department/pinned/${user.id}`);
            const result = await response.json();
            
            if (result.status) {
                const pinnedMap = {};
                result.data.forEach(dept => {
                    pinnedMap[dept.id] = true;
                });
                setPinnedDepartments(pinnedMap);
                setLikedCommunities(pinnedMap); // Sync with liked state
            }
        } catch (err) {
            console.error('Error fetching pinned departments:', err);
        }
    };

    const toggleLike = async (departmentId) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                alert('Please login to pin communities');
                return;
            }

            const response = await fetch(`${process.env.REACT_APP_API_URL}/department/pin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id: user.id,
                    department_id: departmentId
                })
            });

            const result = await response.json();
            if (result.status) {
                setPinnedDepartments(prev => ({
                    ...prev,
                    [departmentId]: !prev[departmentId]
                }));
                setLikedCommunities(prev => ({
                    ...prev,
                    [departmentId]: !prev[departmentId]
                }));
            } else {
                alert(result.message);
            }
        } catch (err) {
            console.error('Error toggling pin:', err);
            alert('Failed to pin/unpin community');
        }
    };

    // Filter departments based on search term
    const filteredDepartments = departments.filter(department => 
        department.name.toLowerCase().includes(contentsearchTerm.toLowerCase()) ||
        (department.faculty_name && department.faculty_name.toLowerCase().includes(contentsearchTerm.toLowerCase()))
    );

    return (
        <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
            <Header />
            <div className="flex-1 container mx-auto p-6">
                <h1 className={`text-center text-3xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    Find Communities
                </h1>
                
                {/* Search Bar */}
                <div className="relative mb-8 mx-auto w-full lg:w-1/2">
                    <input
                        type="text"
                        placeholder="Type here to search communities or faculties..."
                        value={contentsearchTerm}
                        onChange={(e) => setContentSearchTerm(e.target.value)}
                        className={`w-full h-[50px] px-4 py-2 rounded-md focus:outline-none ${
                            theme === "dark" 
                            ? "bg-gray-800 text-white placeholder-gray-400" 
                            : "bg-white text-gray-900 placeholder-gray-500 border border-gray-300"
                        }`}
                    />
                    <FaSearch className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                </div>

                {/* Community Cards */}
                <div className="flex justify-center flex-wrap space-y-4 w-full lg:w-1/2 mx-auto">
                    {loading ? (
                        <p className={theme === "dark" ? "text-white" : "text-gray-900"}>Loading departments...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : filteredDepartments.length === 0 ? (
                        <p className={theme === "dark" ? "text-white" : "text-gray-900"}>No communities found matching your search</p>
                    ) : (
                        filteredDepartments.map((department, index) => (
                            <div
                                key={department.id}
                                className={`flex justify-between items-center rounded-2xl p-8 shadow-lg w-full cursor-pointer ${
                                    theme === "dark"
                                    ? "bg-gray-800 hover:bg-gray-700"
                                    : "bg-white hover:bg-gray-50 border border-gray-200"
                                }`}
                                onClick={() => navigate(`/department-community/${department.id}`)}
                            >
                                <div className="flex flex-col items-center w-full text-center">
                                    <h2 className={`text-lg font-semibold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                        {department.name}
                                    </h2>
                                    <h2 className={`text-lg font-semibold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                        {department.faculty_name}
                                    </h2>
                                    <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                        Created at: {new Date(new Date(department.created_at).getTime() + 7 * 60 * 60 * 1000).toLocaleString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            timeZone: 'Asia/Phnom_Penh'
                                        })}
                                    </p>
                                </div>
                                <FaHeart
                                    className={`cursor-pointer w-6 h-6 ${likedCommunities[department.id] ? 'text-orange-500' : theme === "dark" ? 'text-gray-400' : 'text-gray-500'}`}
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
