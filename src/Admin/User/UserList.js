import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import AdminSidebar from '../Component/AdminSidebar';
import { FaSearch, FaEdit, FaTrash, FaEye, FaSave, FaTimes, FaUnlock, FaLock, FaUserPlus } from 'react-icons/fa';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    address: '',
    phone: '',
    city: '',
    department: '',
    admin: false
  });
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

  useEffect(() => {
    // Fetch users from API
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Use the API_URL with the endpoint
      const response = await fetch(`${API_URL}/user`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Check if the API returned success status
      if (result.status === 'success') {
        setUsers(result.data);
      } else {
        throw new Error(result.message || 'Failed to fetch users');
      }
    } catch (error) {
      setError(error.message);
      
      // For development - mock data if API call fails
      setUsers([
        { id: 1, name: 'John Doe', email: 'john@example.com', bio: 'Software Developer', address: '123 Main St', phone: '555-1234', password: '*****' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', bio: 'UX Designer', address: '456 Oak Ave', phone: '555-5678', password: '*****' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', bio: 'Product Manager', address: '789 Elm St', phone: '555-9012', password: '*****' },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', bio: 'Data Scientist', address: '101 Pine Rd', phone: '555-3456', password: '*****' },
        { id: 5, name: 'Michael Brown', email: 'michael@example.com', bio: 'Marketing Specialist', address: '202 Cedar Ln', phone: '555-7890', password: '*****' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleUserDelete = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/user/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status === true) {
        // Update local state only after successful deletion
        setUsers(users.filter(user => user.id !== userId));
        setConfirmDelete(null);
        alert('User deleted successfully');
      } else {
        throw new Error(result.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert('An error occurred while deleting the user. Please try again.');
    }
  };

  const handleBanUser = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/user/ban/${userId}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status === true) {
        // Update local state
        setUsers(users.map(user => 
          user.id === userId ? { ...user, banned: true } : user
        ));
        alert('User banned successfully');
      } else {
        throw new Error(result.message || 'Failed to ban user');
      }
    } catch (error) {
      console.error("Error banning user:", error);
      alert('An error occurred while banning the user. Please try again.');
    }
  };

  const handleUnbanUser = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/user/unban/${userId}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.status === true) {
        // Update local state
        setUsers(users.map(user => 
          user.id === userId ? { ...user, banned: false } : user
        ));
        alert('User unbanned successfully');
      } else {
        throw new Error(result.message || 'Failed to unban user');
      }
    } catch (error) {
      console.error("Error unbanning user:", error);
      alert('An error occurred while unbanning the user. Please try again.');
    }
  };

  const handleEditSave = async () => {
    try {
      if (!editingUser || !editingUser.email) {
        alert('Email is required');
        return;
      }

      const response = await fetch(`${API_URL}/user/update-profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: editingUser.email,
          name: editingUser.name,
          bio: editingUser.bio,
          address: editingUser.address,
          phone: editingUser.phone,
          admin: editingUser.admin
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === true) {
        // Update was successful, update the local state
        setUsers(users.map(user => 
          user.id === editingUser.id ? { ...user, ...result.user } : user
        ));
        setEditingUser(null);
        alert('User updated successfully');
      } else {
        alert(result.message || 'Failed to update user');
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert('An error occurred while updating the user. Please try again.');
    }
  };

  const handleEditCancel = () => {
    setEditingUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateUser = async () => {
    try {
      if (!newUser.email || !newUser.password || !newUser.name) {
        alert('Name, email and password are required');
        return;
      }

      const response = await fetch(`${API_URL}/user/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === true) {
        // Refresh the user list
        fetchUsers();
        setIsCreatingUser(false);
        setNewUser({
          name: '',
          email: '',
          password: '',
          bio: '',
          address: '',
          phone: '',
          city: '',
          department: '',
          admin: false
        });
        alert('User created successfully');
      } else {
        throw new Error(result.message || 'Failed to create user');
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert('An error occurred while creating the user. Please try again.');
    }
  };

  const handleNewUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.bio && user.bio.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <Header />
      <div className="flex">
        <AdminSidebar />
        
        {/* Main Content */}
        <div className="flex-1 bg-gray-100 p-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
              
              <div className="flex items-center space-x-4">
                {/* Create User Button */}
                <button
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={() => setIsCreatingUser(true)}
                >
                  <FaUserPlus className="mr-2" />
                  Create Account
                </button>
                
                {/* Search Bar */}
                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full p-2 pl-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
            
            {/* User Details Modal */}
            {selectedUser && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setSelectedUser(null)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedUser.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{selectedUser.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">{selectedUser.address || 'N/A'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500">Bio</p>
                      <p className="font-medium whitespace-pre-wrap">{selectedUser.bio || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => {
                        setEditingUser({...selectedUser});
                        setSelectedUser(null);
                      }}
                    >
                      Edit User
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => {
                        setConfirmDelete(selectedUser);
                        setSelectedUser(null);
                      }}
                    >
                      Delete User
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Edit User Modal */}
            {editingUser && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">Edit User</h3>
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={handleEditCancel}
                    >
                      <FaTimes />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        name="name"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={editingUser.name || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email (Cannot be changed)</label>
                      <input
                        type="text"
                        name="email"
                        className="w-full p-2 border rounded-md bg-gray-100"
                        value={editingUser.email || ''}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={editingUser.phone || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        name="address"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={editingUser.address || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        name="bio"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={editingUser.bio || ''}
                        onChange={handleInputChange}
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="admin"
                          checked={editingUser.admin || false}
                          onChange={(e) => {
                            setEditingUser(prev => ({
                              ...prev,
                              admin: e.target.checked
                            }));
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Admin Access</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={handleEditSave}
                    >
                      Save Changes
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                      onClick={handleEditCancel}
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
                  <p className="mb-6">Are you sure you want to delete the user "{confirmDelete.name}"?</p>
                  <div className="flex justify-end space-x-4">
                    <button
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                      onClick={() => setConfirmDelete(null)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleUserDelete(confirmDelete.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* Create User Modal */}
            {isCreatingUser && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">Create New User</h3>
                    <button 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => setIsCreatingUser(false)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                      <input
                        type="text"
                        name="name"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newUser.name}
                        onChange={handleNewUserInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input
                        type="email"
                        name="email"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newUser.email}
                        onChange={handleNewUserInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                      <input
                        type="password"
                        name="password"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newUser.password}
                        onChange={handleNewUserInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newUser.phone}
                        onChange={handleNewUserInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <input
                        type="text"
                        name="city"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newUser.city}
                        onChange={handleNewUserInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <input
                        type="text"
                        name="department"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newUser.department}
                        onChange={handleNewUserInputChange}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input
                        type="text"
                        name="address"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newUser.address}
                        onChange={handleNewUserInputChange}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        name="bio"
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newUser.bio}
                        onChange={handleNewUserInputChange}
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="md:col-span-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="admin"
                          checked={newUser.admin || false}
                          onChange={(e) => {
                            setNewUser(prev => ({
                              ...prev,
                              admin: e.target.checked
                            }));
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Admin Access</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={handleCreateUser}
                    >
                      Create User
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                      onClick={() => setIsCreatingUser(false)}
                    >
                      Cancel
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
                <p>Error loading users: {error}</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Name</th>
                        <th className="py-3 px-4 text-left">Email</th>
                        <th className="py-3 px-4 text-left">Bio</th>
                        <th className="py-3 px-4 text-left">Phone</th>
                        <th className="py-3 px-4 text-left">Address</th>
                        <th className="py-3 px-4 text-left">Admin</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredUsers.map(user => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4">{user.id}</td>
                          <td className="py-3 px-4">{user.name}</td>
                          <td className="py-3 px-4">{user.email}</td>
                          <td className="py-3 px-4">
                            <div className="max-w-xs truncate">{user.bio || '-'}</div>
                          </td>
                          <td className="py-3 px-4">{user.phone || '-'}</td>
                          <td className="py-3 px-4">
                            <div className="max-w-xs truncate">{user.address || '-'}</div>
                          </td>
                          <td className="py-3 px-4">
                            {user.admin ? (
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Admin</span>
                            ) : (
                              <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">User</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button 
                                className="text-green-500 hover:text-green-700"
                                title="View Details"
                                onClick={() => setSelectedUser(user)}
                              >
                                <FaEye />
                              </button>
                              <button 
                                className="text-blue-500 hover:text-blue-700"
                                title="Edit"
                                onClick={() => setEditingUser({...user})}
                              >
                                <FaEdit />
                              </button>
                              {user.banned ? (
                                <button 
                                  className="text-yellow-500 hover:text-yellow-700"
                                  title="Unban User"
                                  onClick={() => handleUnbanUser(user.id)}
                                >
                                  <FaUnlock />
                                </button>
                              ) : (
                                <button 
                                  className="text-red-500 hover:text-red-700"
                                  title="Ban User"
                                  onClick={() => handleBanUser(user.id)}
                                >
                                  <FaLock />
                                </button>
                              )}
                              <button 
                                className="text-red-500 hover:text-red-700"
                                title="Delete"
                                onClick={() => setConfirmDelete(user)}
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
                
                {filteredUsers.length === 0 && (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No users found matching your search.</p>
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

export default UserList; 