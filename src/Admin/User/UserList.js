import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import AdminSidebar from '../components/AdminSidebar';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    // Fetch users from API
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
        
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        
        // For development - mock data if API call fails
        setUsers([
          { id: 1, name: 'John Doe', email: 'john@example.com', bio: 'Software Developer', address: '123 Main St', phone: '555-1234', password: '*****' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', bio: 'UX Designer', address: '456 Oak Ave', phone: '555-5678', password: '*****' },
          { id: 3, name: 'Bob Johnson', email: 'bob@example.com', bio: 'Product Manager', address: '789 Elm St', phone: '555-9012', password: '*****' },
          { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', bio: 'Data Scientist', address: '101 Pine Rd', phone: '555-3456', password: '*****' },
          { id: 5, name: 'Michael Brown', email: 'michael@example.com', bio: 'Marketing Specialist', address: '202 Cedar Ln', phone: '555-7890', password: '*****' },
        ]);
      }
    };

    fetchUsers();
  }, []);

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
                            <div className="flex space-x-2">
                              <button className="text-blue-500 hover:text-blue-700">
                                <FaEdit />
                              </button>
                              <button className="text-red-500 hover:text-red-700">
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