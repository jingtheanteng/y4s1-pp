import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Components/Header';
import { useTheme } from './ThemeContext';
import { validateSession } from '../utils/auth';

function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [post, setPost] = useState(null);
    const [categories, setCategories] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editedPost, setEditedPost] = useState({
        name: '',
        description: '',
        department_id: '',
        category_id: ''
    });

    useEffect(() => {
        const fetchData = async () => {
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

                // Fetch post details
                const postResponse = await fetch(`http://localhost:5001/post/${id}`);
                const postData = await postResponse.json();

                if (postData.status === true) {
                    setPost(postData.data);
                    setEditedPost({
                        name: postData.data.name,
                        description: postData.data.description || '',
                        department_id: postData.data.department_id,
                        category_id: postData.data.category_id
                    });
                } else {
                    throw new Error(postData.message || 'Failed to fetch post');
                }

                // Fetch categories
                const categoriesResponse = await fetch('http://localhost:5001/category');
                const categoriesData = await categoriesResponse.json();
                if (categoriesData.status === true) {
                    setCategories(categoriesData.data);
                }

                // Fetch departments
                const departmentsResponse = await fetch('http://localhost:5001/department');
                const departmentsData = await departmentsResponse.json();
                if (departmentsData.status === true) {
                    setDepartments(departmentsData.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedPost(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                throw new Error('User not logged in');
            }

            const response = await fetch(`http://localhost:5001/post/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...editedPost,
                    owner_id: user.id
                }),
            });

            const data = await response.json();
            if (data.status) {
                alert('Post updated successfully');
                navigate('/profile');
            } else {
                throw new Error(data.message || 'Failed to update post');
            }
        } catch (error) {
            console.error('Error updating post:', error);
            alert(error.message);
        }
    };

    if (loading) {
        return (
            <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
                <Header />
                <div className="container mx-auto p-6">
                    <p className={`text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
                <Header />
                <div className="container mx-auto p-6">
                    <p className={`text-center text-red-500`}>
                        Error: {error}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
            <Header />
            <div className="container mx-auto p-6">
                <div className="max-w-2xl mx-auto">
                    <h1 className={`text-2xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Edit Post
                    </h1>
                    <form onSubmit={handleSubmit} className={`p-6 rounded-lg shadow-md ${
                        theme === "dark" ? "bg-gray-800" : "bg-white"
                    }`}>
                        <div className="mb-4">
                            <label className={`block mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                Title
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={editedPost.name}
                                onChange={handleInputChange}
                                className={`w-full p-2 border rounded-md ${
                                    theme === "dark"
                                    ? "bg-gray-700 text-white border-gray-600"
                                    : "bg-white text-gray-900 border-gray-300"
                                }`}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className={`block mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={editedPost.description}
                                onChange={handleInputChange}
                                rows="4"
                                className={`w-full p-2 border rounded-md ${
                                    theme === "dark"
                                    ? "bg-gray-700 text-white border-gray-600"
                                    : "bg-white text-gray-900 border-gray-300"
                                }`}
                            />
                        </div>

                        <div className="mb-4">
                            <label className={`block mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                Category
                            </label>
                            <select
                                name="category_id"
                                value={editedPost.category_id}
                                onChange={handleInputChange}
                                className={`w-full p-2 border rounded-md ${
                                    theme === "dark"
                                    ? "bg-gray-700 text-white border-gray-600"
                                    : "bg-white text-gray-900 border-gray-300"
                                }`}
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className={`block mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                Department
                            </label>
                            <select
                                name="department_id"
                                value={editedPost.department_id}
                                onChange={handleInputChange}
                                className={`w-full p-2 border rounded-md ${
                                    theme === "dark"
                                    ? "bg-gray-700 text-white border-gray-600"
                                    : "bg-white text-gray-900 border-gray-300"
                                }`}
                                required
                            >
                                <option value="">Select a department</option>
                                {departments.map(department => (
                                    <option key={department.id} value={department.id}>
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={() => navigate('/profile')}
                                className={`px-4 py-2 rounded-md ${
                                    theme === "dark"
                                    ? "bg-gray-600 hover:bg-gray-700 text-white"
                                    : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                                }`}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditPost; 