import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import AdminSidebar from '../Component/AdminSidebar';
import { FaSearch, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

  useEffect(() => {
    // Fetch categories from API
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      // Use the API_URL with the endpoint
      const response = await fetch(`${API_URL}/category`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Check if the API returned success status
      if (result.status === true) {
        setCategories(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch categories');
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError(error.message);
      
      // For development - mock data if API call fails
      setCategories([
        { id: 1, name: 'General', created_at: '2023-05-10T10:30:00' },
        { id: 2, name: 'Academics', created_at: '2023-05-10T10:30:00' },
        { id: 3, name: 'Events', created_at: '2023-05-10T10:30:00' },
        { id: 4, name: 'Campus Life', created_at: '2023-05-10T10:30:00' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add new category
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    
    try {
      const response = await fetch(`${API_URL}/category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newCategory }),
      });
      
      const result = await response.json();
      
      if (result.status === true) {
        setNewCategory('');
        setIsAddingCategory(false);
        fetchCategories(); // Refresh the list
      } else {
        if (result.message.includes('unique')) {
          alert('Category name must be unique. This name already exists.');
        } else {
          alert(result.message || 'Failed to add category');
        }
      }
    } catch (error) {
      console.error("Error adding category:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Start editing a category
  const handleEditStart = (category) => {
    setEditingCategory({
      id: category.id,
      name: category.name
    });
  };

  // Cancel editing
  const handleEditCancel = () => {
    setEditingCategory(null);
  };

  // Save edited category
  const handleEditSave = async () => {
    if (!editingCategory.name.trim()) return;
    
    try {
      const response = await fetch(`${API_URL}/category/${editingCategory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editingCategory.name }),
      });
      
      const result = await response.json();
      
      if (result.status === true) {
        setEditingCategory(null);
        fetchCategories(); // Refresh the list
      } else {
        if (result.message.includes('unique')) {
          alert('Category name must be unique. This name already exists.');
        } else {
          alert(result.message || 'Failed to update category');
        }
      }
    } catch (error) {
      console.error("Error updating category:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Delete a category
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/category/${id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.status === true) {
        setConfirmDelete(null);
        fetchCategories(); // Refresh the list
      } else {
        if (result.message.includes('being used by posts')) {
          alert('Cannot delete this category because it is being used by posts.');
        } else {
          alert(result.message || 'Failed to delete category');
        }
      }
    } catch (error) {
      console.error("Error deleting category:", error);
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
              <h1 className="text-2xl font-bold text-gray-800">Category Management</h1>
              
              <div className="flex space-x-4">
                {/* Search Bar */}
                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="Search categories..."
                    className="w-full p-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                
                {/* Add Category Button */}
                <button
                  className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  onClick={() => setIsAddingCategory(true)}
                >
                  <FaPlus className="mr-2" />
                  Add Category
                </button>
              </div>
            </div>
            
            {/* Add Category Form */}
            {isAddingCategory && (
              <div className="mb-6 p-4 border rounded-md bg-gray-50">
                <h2 className="text-lg font-semibold mb-3">Add New Category</h2>
                <div className="flex items-center">
                  <input
                    type="text"
                    placeholder="Category name"
                    className="flex-grow p-2 border rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddCategory();
                      }
                    }}
                  />
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 mr-2"
                    onClick={handleAddCategory}
                  >
                    Save
                  </button>
                  <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    onClick={() => setIsAddingCategory(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Confirm Delete Modal */}
            {confirmDelete && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                  <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                  <p className="mb-6">Are you sure you want to delete the category "{confirmDelete.name}"?</p>
                  <p className="mb-6 text-sm text-red-600">Note: Categories that are used by posts cannot be deleted.</p>
                  <div className="flex justify-end space-x-4">
                    <button
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                      onClick={() => setConfirmDelete(null)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(confirmDelete.id)}
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
                <p>Error loading categories: {error}</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Created At</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredCategories.map(category => (
                        <tr key={category.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4">{category.id}</td>
                          <td className="py-3 px-4">
                            {editingCategory && editingCategory.id === category.id ? (
                              <input
                                type="text"
                                className="p-1 border rounded w-full"
                                value={editingCategory.name}
                                onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    handleEditSave();
                                  }
                                }}
                              />
                            ) : (
                              category.name
                            )}
                          </td>
                          <td className="py-3 px-4">{formatDate(category.created_at)}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              {editingCategory && editingCategory.id === category.id ? (
                                <>
                                  <button
                                    className="text-green-500 hover:text-green-700 px-2"
                                    title="Save"
                                    onClick={handleEditSave}
                                  >
                                    Save
                                  </button>
                                  <button
                                    className="text-gray-500 hover:text-gray-700 px-2"
                                    title="Cancel"
                                    onClick={handleEditCancel}
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    className="text-blue-500 hover:text-blue-700"
                                    title="Edit"
                                    onClick={() => handleEditStart(category)}
                                  >
                                    <FaEdit />
                                  </button>
                                  <button
                                    className="text-red-500 hover:text-red-700"
                                    title="Delete"
                                    onClick={() => setConfirmDelete(category)}
                                  >
                                    <FaTrash />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredCategories.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No categories found.
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

export default CategoryList; 