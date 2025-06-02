import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import AdminSidebar from '../Component/AdminSidebar';
import { FaSearch, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingDepartment, setIsAddingDepartment] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [newDepartment, setNewDepartment] = useState({
    name: '',
    description: '',
    faculty_id: ''
  });
  const [confirmDelete, setConfirmDelete] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

  useEffect(() => {
    // Fetch departments and faculties
    fetchDepartments();
    fetchFaculties();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
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
      setError(error.message);
      
      // For development - mock data if API call fails
      setDepartments([
        { id: 1, name: 'Computer Science', description: 'Computer Science Department', faculty_id: 1, created_at: '2023-05-10T10:30:00', faculty_name: 'Engineering' },
        { id: 2, name: 'Mathematics', description: 'Mathematics Department', faculty_id: 2, created_at: '2023-05-10T10:30:00', faculty_name: 'Science' },
        { id: 3, name: 'Psychology', description: 'Psychology Department', faculty_id: 3, created_at: '2023-05-10T10:30:00', faculty_name: 'Humanities' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchFaculties = async () => {
    try {
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
      
      // For development - mock data if API call fails
      setFaculties([
        { id: 1, name: 'Engineering', description: 'Engineering Faculty' },
        { id: 2, name: 'Science', description: 'Science Faculty' },
        { id: 3, name: 'Humanities', description: 'Humanities Faculty' },
      ]);
    }
  };

  // Get department by ID for editing
  const fetchDepartment = async (id) => {
    try {
      const response = await fetch(`${API_URL}/department/${id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.status === true) {
        setEditingDepartment(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch department');
      }
    } catch (error) {
      console.error("Error fetching department:", error);
      alert("An error occurred while fetching department details.");
    }
  };

  // Filter departments based on search term
  const filteredDepartments = departments.filter(department => 
    department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (department.description && department.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (department.faculty_name && department.faculty_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle input change for new department
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingDepartment) {
      setEditingDepartment(prev => ({
        ...prev,
        [name]: value
      }));
    } else {
      setNewDepartment(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Add new department
  const handleAddDepartment = async () => {
    if (!newDepartment.name.trim()) return;
    
    try {
      const response = await fetch(`${API_URL}/department`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newDepartment.name,
          description: newDepartment.description,
          faculty_id: newDepartment.faculty_id || null
        }),
      });
      
      const result = await response.json();
      
      if (result.status === true) {
        setNewDepartment({
          name: '',
          description: '',
          faculty_id: ''
        });
        setIsAddingDepartment(false);
        fetchDepartments(); // Refresh the list
      } else {
        alert(result.message || 'Failed to add department');
      }
    } catch (error) {
      console.error("Error adding department:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Start edit department process
  const handleEditClick = (departmentId) => {
    fetchDepartment(departmentId);
  };

  // Update department
  const handleUpdateDepartment = async () => {
    if (!editingDepartment?.name.trim()) return;
    
    try {
      const response = await fetch(`${API_URL}/department/${editingDepartment.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editingDepartment.name,
          description: editingDepartment.description,
          faculty_id: editingDepartment.faculty_id || null
        }),
      });
      
      const result = await response.json();
      
      if (result.status === true) {
        setEditingDepartment(null);
        fetchDepartments(); // Refresh the list
      } else {
        alert(result.message || 'Failed to update department');
      }
    } catch (error) {
      console.error("Error updating department:", error);
      alert("An error occurred. Please try again.");
    }
  };

  // Delete department
  const handleDeleteDepartment = async (id) => {
    try {
      const response = await fetch(`${API_URL}/department/${id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.status === true) {
        setConfirmDelete(null);
        fetchDepartments(); // Refresh the list
      } else {
        alert(result.message || 'Failed to delete department');
      }
    } catch (error) {
      console.error("Error deleting department:", error);
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
              <h1 className="text-2xl font-bold text-gray-800">Department Management</h1>
              
              <div className="flex space-x-4">
                {/* Search Bar */}
                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="Search departments..."
                    className="w-full p-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                
                {/* Add Department Button */}
                <button
                  className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  onClick={() => {
                    setIsAddingDepartment(true);
                    setEditingDepartment(null);
                  }}
                >
                  <FaPlus className="mr-2" />
                  Add Department
                </button>
              </div>
            </div>
            
            {/* Add Department Form */}
            {isAddingDepartment && !editingDepartment && (
              <div className="mb-6 p-4 border rounded-md bg-gray-50">
                <h2 className="text-lg font-semibold mb-3">Add New Department</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Faculty</label>
                    <select
                      name="faculty_id"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newDepartment.faculty_id}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a faculty</option>
                      {faculties.map(faculty => (
                        <option key={faculty.id} value={faculty.id}>
                          {faculty.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Department name"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newDepartment.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      placeholder="Department description"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={newDepartment.description}
                      onChange={handleInputChange}
                      rows="3"
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                      onClick={handleAddDepartment}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                      onClick={() => setIsAddingDepartment(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Edit Department Form */}
            {editingDepartment && (
              <div className="mb-6 p-4 border rounded-md bg-gray-50">
                <h2 className="text-lg font-semibold mb-3">Edit Department</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Department name"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editingDepartment.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      placeholder="Department description"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editingDepartment.description || ''}
                      onChange={handleInputChange}
                      rows="3"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Faculty</label>
                    <select
                      name="faculty_id"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={editingDepartment.faculty_id || ''}
                      onChange={handleInputChange}
                    >
                      <option value="">Select a faculty</option>
                      {faculties.map(faculty => (
                        <option key={faculty.id} value={faculty.id}>
                          {faculty.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex justify-end space-x-2 mt-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      onClick={handleUpdateDepartment}
                    >
                      Update
                    </button>
                    <button
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                      onClick={() => setEditingDepartment(null)}
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
                  <p className="mb-6">Are you sure you want to delete the department "{confirmDelete.name}"?</p>
                  <div className="flex justify-end space-x-4">
                    <button
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                      onClick={() => setConfirmDelete(null)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDeleteDepartment(confirmDelete.id)}
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
                <p>Error loading departments: {error}</p>
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
                        <th className="py-3 px-4 text-left">Faculty</th>
                        <th className="py-3 px-4 text-left">Created At</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredDepartments.map(department => (
                        <tr key={department.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4">{department.id}</td>
                          <td className="py-3 px-4">{department.name}</td>
                          <td className="py-3 px-4">{department.description || 'N/A'}</td>
                          <td className="py-3 px-4">{department.faculty_name || 'N/A'}</td>
                          <td className="py-3 px-4">{formatDate(department.created_at)}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button
                                className="text-blue-500 hover:text-blue-700"
                                title="Edit"
                                onClick={() => handleEditClick(department.id)}
                              >
                                <FaEdit />
                              </button>
                              <button
                                className="text-red-500 hover:text-red-700"
                                title="Delete"
                                onClick={() => setConfirmDelete(department)}
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
                
                {filteredDepartments.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No departments found.
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

export default DepartmentList; 