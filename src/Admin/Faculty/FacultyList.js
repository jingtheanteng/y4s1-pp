import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import AdminSidebar from '../components/AdminSidebar';
import { FaSearch, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

function FacultyList() {
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingFaculty, setIsAddingFaculty] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    description: ''
  });
  const [confirmDelete, setConfirmDelete] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

  useEffect(() => {
    // Fetch faculties
    fetchFaculties();
  }, []);

  const fetchFaculties = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/faculty`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.status === true) {
        setFaculties(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch faculties');
      }
    } catch (error) {
      console.error("Error fetching faculties:", error);
      setError(error.message);
      
      // For development - mock data if API call fails
      setFaculties([
        { id: 1, name: 'Engineering', description: 'Faculty of Engineering', created_at: '2023-05-10T10:30:00' },
        { id: 2, name: 'Science', description: 'Faculty of Science', created_at: '2023-05-10T10:30:00' },
        { id: 3, name: 'Humanities', description: 'Faculty of Humanities', created_at: '2023-05-10T10:30:00' },
        { id: 4, name: 'Business', description: 'Faculty of Business Administration', created_at: '2023-05-10T10:30:00' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Get faculty by ID for editing
  const fetchFaculty = async (id) => {
    try {
      const response = await fetch(`${API_URL}/faculty/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.status === true) {
        setEditingFaculty(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch faculty');
      }
    } catch (error) {
      console.error("Error fetching faculty:", error);
      alert("An error occurred while fetching faculty details.");
    }
  };

  // Filter faculties based on search term
  const filteredFaculties = faculties.filter(faculty => 
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (faculty.description && faculty.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle input change for faculty data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingFaculty) {
      setEditingFaculty(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setNewFaculty(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Add new faculty
  const handleAddFaculty = async () => {
    if (!newFaculty.name.trim()) return;
    
    try {
      const response = await fetch(`${API_URL}/faculty`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newFaculty.name,
          description: newFaculty.description
        }),
      });
      
      const result = await response.json();
      
      if (result.status === true) {
        setNewFaculty({
          name: '',
          description: ''
        });
        setIsAddingFaculty(false);
        fetchFaculties(); // Refresh the list
      } else {
        alert(result.message || 'Failed to add faculty');
      }
    } catch (error) {
      console.error("Error adding faculty:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Start edit faculty process
  const handleEditClick = (facultyId) => {
    fetchFaculty(facultyId);
  };

  // Update faculty
  const handleUpdateFaculty = async () => {
    if (!editingFaculty?.name.trim()) return;
    
    try {
      const response = await fetch(`${API_URL}/faculty/${editingFaculty.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editingFaculty.name,
          description: editingFaculty.description
        }),
      });
      
      const result = await response.json();
      
      if (result.status === true) {
        setEditingFaculty(null);
        fetchFaculties(); // Refresh the list
      } else {
        alert(result.message || 'Failed to update faculty');
      }
    } catch (error) {
      console.error("Error updating faculty:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Delete faculty
  const handleDeleteFaculty = async (id) => {
    try {
      const response = await fetch(`${API_URL}/faculty/${id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.status === true) {
        setConfirmDelete(null);
        fetchFaculties(); // Refresh the list
      } else {
        alert(result.message || 'Failed to delete faculty');
      }
    } catch (error) {
      console.error("Error deleting faculty:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(new Date(dateString).getTime() + 7 * 60 * 60 * 1000).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Phnom_Penh'
    });
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
              <h1 className="text-2xl font-bold text-gray-800">Faculty Management</h1>
              
              <div className="flex space-x-4">
                {/* Search Bar */}
                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="Search faculties..."
                    className="w-full p-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                
                {/* Add Faculty Button */}
                <button
                  className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  onClick={() => {
                    setIsAddingFaculty(true);
                    setEditingFaculty(null);
                  }}
                >
                  <FaPlus className="mr-2" />
                  Add Faculty
                </button>
              </div>
            </div>
            
            {/* Add Faculty Form */}
            {isAddingFaculty && !editingFaculty && (
              <div className="mb-6 p-4 border rounded-md bg-gray-50">
                <h2 className="text-lg font-semibold mb-3">Add New Faculty</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Faculty name"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newFaculty.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      placeholder="Faculty description"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newFaculty.description}
                      onChange={handleInputChange}
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                      onClick={handleAddFaculty}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                      onClick={() => setIsAddingFaculty(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Edit Faculty Form */}
            {editingFaculty && (
              <div className="mb-6 p-4 border rounded-md bg-gray-50">
                <h2 className="text-lg font-semibold mb-3">Edit Faculty</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Faculty name"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editingFaculty.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      placeholder="Faculty description"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editingFaculty.description || ''}
                      onChange={handleInputChange}
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      onClick={handleUpdateFaculty}
                    >
                      Update
                    </button>
                    <button
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                      onClick={() => setEditingFaculty(null)}
                    >
                      Cancel
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
                  <p className="mb-6">Are you sure you want to delete the faculty "{confirmDelete.name}"?</p>
                  <p className="mb-6 text-sm text-red-600">Note: Faculties with departments cannot be deleted.</p>
                  <div className="flex justify-end space-x-4">
                    <button
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                      onClick={() => setConfirmDelete(null)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDeleteFaculty(confirmDelete.id)}
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
                <p>Error loading faculties: {error}</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Description</th>
                        <th className="py-3 px-4 text-left">Created At</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredFaculties.map(faculty => (
                        <tr key={faculty.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4">{faculty.id}</td>
                          <td className="py-3 px-4">{faculty.name}</td>
                          <td className="py-3 px-4">{faculty.description || 'N/A'}</td>
                          <td className="py-3 px-4">{formatDate(faculty.created_at)}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button
                                className="text-blue-500 hover:text-blue-700"
                                title="Edit"
                                onClick={() => handleEditClick(faculty.id)}
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="text-red-500 hover:text-red-700"
                                title="Delete"
                                onClick={() => setConfirmDelete(faculty)}
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
                
                {filteredFaculties.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No faculties found.
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

export default FacultyList; 