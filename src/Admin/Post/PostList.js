import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import AdminSidebar from '../components/AdminSidebar';
import { FaSearch, FaEye, FaTrash, FaFilter, FaThumbsUp, FaComment, FaTimes } from 'react-icons/fa';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category_id: '',
    department_id: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

  useEffect(() => {
    // Fetch posts, categories, and departments
    fetchPosts();
    fetchCategories();
    fetchDepartments();
  }, []);

  useEffect(() => {
    // Refetch posts when filters change
    fetchPosts();
  }, [filters]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      // Build URL with query parameters for filters
      let url = new URL(`${API_URL}/post`);
      
      // Add filter parameters if they exist
      if (filters.category_id) {
        url.searchParams.append('category_id', filters.category_id);
      }
      if (filters.department_id) {
        url.searchParams.append('department_id', filters.department_id);
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.status === true) {
        setPosts(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch posts');
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError(error.message);
      
      // For development - mock data if API call fails
      setPosts([
        { 
          id: 1, 
          name: 'Introduction to Computer Science', 
          description: 'Learn the basics of computer science and programming.', 
          department_id: 1, 
          category_id: 2, 
          owner_id: 1, 
          like_count: 15, 
          created_at: '2023-05-10T10:30:00', 
          owner_name: 'John Doe', 
          category_name: 'Academics', 
          department_name: 'Computer Science',
          comment_count: 5
        },
        { 
          id: 2, 
          name: 'Campus Event: Science Fair', 
          description: 'Annual science fair showcasing student projects.', 
          department_id: 2, 
          category_id: 3, 
          owner_id: 2, 
          like_count: 8, 
          created_at: '2023-05-09T14:20:00', 
          owner_name: 'Jane Smith', 
          category_name: 'Events', 
          department_name: 'Science',
          comment_count: 2
        },
        { 
          id: 3, 
          name: 'Psychology Research Opportunities', 
          description: 'Information about upcoming research opportunities for psychology students.', 
          department_id: 3, 
          category_id: 2, 
          owner_id: 3, 
          like_count: 12, 
          created_at: '2023-05-08T09:15:00', 
          owner_name: 'Bob Johnson', 
          category_name: 'Academics', 
          department_name: 'Psychology',
          comment_count: 7
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostDetails = async (id) => {
    try {
      const response = await fetch(`${API_URL}/post/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.status === true) {
        setSelectedPost(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch post details');
      }
    } catch (error) {
      console.error("Error fetching post details:", error);
      alert("An error occurred while fetching post details.");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/category`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.status === true) {
        setCategories(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch categories');
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      
      // For development - mock data if API call fails
      setCategories([
        { id: 1, name: 'General' },
        { id: 2, name: 'Academics' },
        { id: 3, name: 'Events' },
        { id: 4, name: 'Campus Life' },
      ]);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch(`${API_URL}/department`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.status === true) {
        setDepartments(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch departments');
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      
      // For development - mock data if API call fails
      setDepartments([
        { id: 1, name: 'Computer Science' },
        { id: 2, name: 'Science' },
        { id: 3, name: 'Psychology' },
      ]);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      // Using the built-in fetch API to make a DELETE request
      const response = await fetch(`${API_URL}/post/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.status === true) {
        // Post deleted successfully, update the UI
        setConfirmDelete(null);
        fetchPosts(); // Refresh the list
        alert('Post deleted successfully');
      } else {
        alert(result.message || 'Failed to delete post');
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert('An error occurred while deleting the post. Please try again.');
    }
  };

  const handleLikePost = async (id) => {
    try {
      const response = await fetch(`${API_URL}/post/${id}/like`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.status === true) {
        // Update the post in the UI with the new like count
        setPosts(posts.map(post => 
          post.id === id 
            ? { ...post, like_count: post.like_count + 1 } 
            : post
        ));
        
        // Also update the selected post if it's currently being viewed
        if (selectedPost && selectedPost.id === id) {
          setSelectedPost({
            ...selectedPost,
            like_count: selectedPost.like_count + 1
          });
        }
      } else {
        alert(result.message || 'Failed to like post');
      }
    } catch (error) {
      console.error("Error liking post:", error);
      alert('An error occurred while liking the post. Please try again.');
    }
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Filter posts based on search term
  const filteredPosts = posts.filter(post => 
    post.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.description && post.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (post.owner_name && post.owner_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (post.category_name && post.category_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (post.department_name && post.department_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category_id: '',
      department_id: ''
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Truncate text with ellipsis if too long
  const truncateText = (text, maxLength = 100) => {
    if (!text) return 'N/A';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <>
      <Header />
      <div className="flex">
        <AdminSidebar />
        
        {/* Main Content */}
        <div className="flex-1 bg-gray-100 p-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Post Management</h1>
              
              <div className="flex space-x-4">
                {/* Search Bar */}
                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="Search posts..."
                    className="w-full p-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                
                {/* Filter Toggle Button */}
                <button
                  className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FaFilter className="mr-2" />
                  Filters
                </button>
              </div>
            </div>
            
            {/* Filters Section */}
            {showFilters && (
              <div className="mb-6 p-4 border rounded-md bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Filter Posts</h2>
                  <button
                    className="text-sm text-blue-500 hover:text-blue-700"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      name="category_id"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filters.category_id}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select
                      name="department_id"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filters.department_id}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Departments</option>
                      {departments.map(department => (
                        <option key={department.id} value={department.id}>
                          {department.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Post Detail Modal */}
            {selectedPost && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{selectedPost.name}</h3>
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setSelectedPost(null)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {selectedPost.category_name && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {selectedPost.category_name}
                        </span>
                      )}
                      {selectedPost.department_name && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          {selectedPost.department_name}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4 whitespace-pre-wrap">
                      {selectedPost.description || 'No description provided.'}
                    </p>
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center text-sm">
                          <FaThumbsUp className="text-blue-500 mr-1" /> {selectedPost.like_count}
                        </span>
                        <span className="flex items-center text-sm">
                          <FaComment className="text-green-500 mr-1" /> {selectedPost.comment_count}
                        </span>
                      </div>
                      <button
                        className="flex items-center text-blue-500 hover:text-blue-700"
                        onClick={() => handleLikePost(selectedPost.id)}
                      >
                        <FaThumbsUp className="mr-1" /> Like
                      </button>
                    </div>
                    
                    <div className="text-sm text-gray-500 mb-2">
                      <p><strong>Author:</strong> {selectedPost.owner_name || 'Unknown'}</p>
                      <p><strong>Created:</strong> {formatDate(selectedPost.created_at)}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-4">
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => {
                        setSelectedPost(null);
                        setConfirmDelete(selectedPost);
                      }}
                    >
                      Delete Post
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Confirm Delete Modal */}
            {confirmDelete && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                  <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                  <p className="mb-6">Are you sure you want to delete the post "{confirmDelete.name}"?</p>
                  <div className="flex justify-end space-x-4">
                    <button
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                      onClick={() => setConfirmDelete(null)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDeletePost(confirmDelete.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 text-red-700 p-4 rounded-md">
                <p>Error loading posts: {error}</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Title</th>
                        <th className="py-3 px-4 text-left">Description</th>
                        <th className="py-3 px-4 text-left">Author</th>
                        <th className="py-3 px-4 text-left">Category</th>
                        <th className="py-3 px-4 text-left">Department</th>
                        <th className="py-3 px-4 text-left">Stats</th>
                        <th className="py-3 px-4 text-left">Created At</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredPosts.map(post => (
                        <tr key={post.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4">{post.id}</td>
                          <td className="py-3 px-4 max-w-[150px] truncate">{post.name}</td>
                          <td className="py-3 px-4 max-w-[200px] truncate">{truncateText(post.description, 50)}</td>
                          <td className="py-3 px-4">{post.owner_name || 'N/A'}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {post.category_name || 'N/A'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              {post.department_name || 'N/A'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <span className="flex items-center text-sm">
                                <FaThumbsUp className="text-blue-500 mr-1" /> {post.like_count}
                              </span>
                              <span className="flex items-center text-sm">
                                <FaComment className="text-green-500 mr-1" /> {post.comment_count}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">{formatDate(post.created_at)}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button
                                className="text-blue-500 hover:text-blue-700"
                                title="View Details"
                                onClick={() => fetchPostDetails(post.id)}
                              >
                                <FaEye />
                              </button>
                              <button
                                className="text-red-500 hover:text-red-700"
                                title="Delete"
                                onClick={() => setConfirmDelete(post)}
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredPosts.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No posts found.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default PostList; 