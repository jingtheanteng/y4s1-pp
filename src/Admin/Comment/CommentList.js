import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import AdminSidebar from '../components/AdminSidebar';
import { FaSearch, FaEye, FaTrash, FaFilter, FaThumbsUp, FaUser, FaClipboard } from 'react-icons/fa';

function CommentList() {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    post_id: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

  useEffect(() => {
    // Fetch comments and posts
    fetchComments();
    fetchPosts();
  }, []);

  useEffect(() => {
    // Refetch comments when filters change
    fetchComments();
  }, [filters]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      
      // Build URL with query parameters for filters
      let url = new URL(`${API_URL}/comment`);
      
      // Add filter parameter if it exists
      if (filters.post_id) {
        url.searchParams.append('post_id', filters.post_id);
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.status === true) {
        setComments(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch comments');
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      setError(error.message);
      
      // For development - mock data if API call fails
      setComments([
        { 
          id: 1, 
          name: 'Great post! Thanks for sharing this information.', 
          like_count: 5, 
          owner_id: 1, 
          post_id: 1, 
          created_at: '2023-05-10T11:30:00', 
          owner_name: 'John Doe'
        },
        { 
          id: 2, 
          name: 'I have a question about this topic. Can anyone help?', 
          like_count: 2, 
          owner_id: 2, 
          post_id: 1, 
          created_at: '2023-05-10T12:15:00', 
          owner_name: 'Jane Smith'
        },
        { 
          id: 3, 
          name: 'Looking forward to the event!', 
          like_count: 3, 
          owner_id: 3, 
          post_id: 2, 
          created_at: '2023-05-09T15:20:00', 
          owner_name: 'Bob Johnson'
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/post`);
      
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
      
      // For development - mock data if API call fails
      setPosts([
        { id: 1, name: 'Introduction to Computer Science' },
        { id: 2, name: 'Campus Event: Science Fair' },
        { id: 3, name: 'Psychology Research Opportunities' },
      ]);
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

  // Filter comments based on search term
  const filteredComments = comments.filter(comment => 
    comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (comment.owner_name && comment.owner_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      post_id: ''
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Get post title by post_id
  const getPostTitle = (postId) => {
    const post = posts.find(p => p.id === postId);
    return post ? post.name : 'Unknown Post';
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
              <h1 className="text-2xl font-bold text-gray-800">Comment Management</h1>
              
              <div className="flex space-x-4">
                {/* Search Bar */}
                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="Search comments..."
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
                  <h2 className="text-lg font-semibold">Filter Comments</h2>
                  <button
                    className="text-sm text-blue-500 hover:text-blue-700"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Post</label>
                  <select
                    name="post_id"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.post_id}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Posts</option>
                    {posts.map(post => (
                      <option key={post.id} value={post.id}>
                        {post.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 text-red-700 p-4 rounded-md">
                <p>Error loading comments: {error}</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Comment</th>
                        <th className="py-3 px-4 text-left">Author</th>
                        <th className="py-3 px-4 text-left">Post</th>
                        <th className="py-3 px-4 text-left">Likes</th>
                        <th className="py-3 px-4 text-left">Created At</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredComments.map(comment => (
                        <tr key={comment.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4">{comment.id}</td>
                          <td className="py-3 px-4 max-w-[300px]">{comment.name}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <FaUser className="text-gray-400 mr-2" />
                              {comment.owner_name || 'Anonymous'}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <FaClipboard className="text-gray-400 mr-2" />
                              {getPostTitle(comment.post_id)}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center text-sm">
                              <FaThumbsUp className="text-blue-500 mr-1" /> {comment.like_count}
                            </div>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">{formatDate(comment.created_at)}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button
                                className="text-blue-500 hover:text-blue-700"
                                title="View Related Post"
                              >
                                <FaEye />
                              </button>
                              <button
                                className="text-red-500 hover:text-red-700"
                                title="Delete"
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
                
                {filteredComments.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No comments found.
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

export default CommentList; 