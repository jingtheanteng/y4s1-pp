import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import AdminSidebar from '../components/AdminSidebar';
import { FaSearch, FaEye, FaTrash, FaFilter, FaFlag, FaUser, FaClipboard, FaCheck, FaTimes } from 'react-icons/fa';

function ReportList() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    report_type: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  // Fetch reports from the backend
  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5001/reports');
      const data = await response.json();
      
      if (data.status) {
        setReports(data.data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch reports');
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Filter reports based on search term and filters
  const filteredReports = reports.filter(report => {
    try {
      const searchTermLower = searchTerm.toLowerCase();
      
      const matchesSearch = 
        String(report.reason || '').toLowerCase().includes(searchTermLower) ||
        String(report.description || '').toLowerCase().includes(searchTermLower) ||
        String(report.content || '').toLowerCase().includes(searchTermLower) ||
        String(report.reporter || '').toLowerCase().includes(searchTermLower) ||
        String(report.content_owner || '').toLowerCase().includes(searchTermLower);

      const matchesFilters = 
        (!filters.status || report.status === filters.status) &&
        (!filters.report_type || report.type === filters.report_type);

      return matchesSearch && matchesFilters;
    } catch (error) {
      console.error('Error filtering report:', error, report);
      return false;
    }
  });

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      status: '',
      report_type: ''
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      return new Date(new Date(dateString).getTime() + 7 * 60 * 60 * 1000).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Phnom_Penh'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid Date';
    }
  };

  // Handle view post button click
  const handleViewPost = (postId) => {
    window.location.href = `/post-detail/${postId}`;
  };

  // Handle delete report
  const handleDeleteReport = async (reportId) => {
    if (window.confirm('Are you sure you want to delete this report?')) {
      try {
        const response = await fetch(`http://localhost:5001/report/${reportId}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        
        if (data.status) {
          setReports(reports.filter(report => report.id !== reportId));
          alert('Report deleted successfully');
        } else {
          alert(data.message || 'Failed to delete report');
        }
      } catch (error) {
        console.error('Error deleting report:', error);
        alert('Failed to delete report');
      }
    }
  };

  // Handle update status
  const handleUpdateStatus = async (reportId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5001/report/${reportId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      
      if (data.status) {
        setReports(reports.map(report => 
          report.id === reportId ? { ...report, status: newStatus } : report
        ));
      } else {
        alert(data.message || 'Failed to update report status');
      }
    } catch (error) {
      console.error('Error updating report status:', error);
      alert('Failed to update report status');
    }
  };

  // Get status badge based on report status
  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span>;
      case 'resolved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Resolved</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Rejected</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Unknown</span>;
    }
  };

  // Handle clear all reports
  const handleClearAllReports = async () => {
    if (window.confirm('Are you sure you want to clear all reports? This action cannot be undone.')) {
      try {
        const deletePromises = reports.map(report => 
          fetch(`http://localhost:5001/report/${report.id}`, { method: 'DELETE' })
        );
        
        await Promise.all(deletePromises);
        setReports([]);
        alert('All reports cleared successfully');
      } catch (error) {
        console.error('Error clearing reports:', error);
        alert('Failed to clear all reports');
      }
    }
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
              <h1 className="text-2xl font-bold text-gray-800">Report Management</h1>
              
              <div className="flex space-x-4">
                {/* Search Bar */}
                <div className="relative w-64">
                  <input
                    type="text"
                    placeholder="Search reports..."
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

                {/* Clear All Reports Button */}
                <button
                  className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  onClick={handleClearAllReports}
                >
                  <FaTrash className="mr-2" />
                  Clear All Reports
                </button>
              </div>
            </div>
            
            {/* Filters Section */}
            {showFilters && (
              <div className="mb-6 p-4 border rounded-md bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Filter Reports</h2>
                  <button
                    className="text-sm text-blue-500 hover:text-blue-700"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filters.status}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Statuses</option>
                      <option value="pending">Pending</option>
                      <option value="resolved">Resolved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      name="report_type"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filters.report_type}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Types</option>
                      <option value="post">Posts</option>
                      <option value="comment">Comments</option>
                    </select>
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
                <p>Error loading reports: {error}</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        <th className="py-3 px-4 text-left">ID</th>
                        <th className="py-3 px-4 text-left">Type</th>
                        <th className="py-3 px-4 text-left">Reason</th>
                        <th className="py-3 px-4 text-left">Description</th>
                        <th className="py-3 px-4 text-left">Content</th>
                        <th className="py-3 px-4 text-left">Reporter</th>
                        <th className="py-3 px-4 text-left">Content Owner</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-left">Created At</th>
                        <th className="py-3 px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredReports.map(report => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4">{report.id}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              report.type === 'comment' 
                                ? 'bg-purple-100 text-purple-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {report.type === 'comment' ? 'Comment' : 'Post'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <FaFlag className="text-red-500 mr-2" />
                              {report.reason}
                            </div>
                          </td>
                          <td className="py-3 px-4 max-w-[250px] truncate" title={report.description}>
                            {report.description}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <FaClipboard className="text-gray-400 mr-2" />
                              {report.type === 'comment' 
                                ? (
                                  <div>
                                    <p className="text-xs text-gray-500">Comment on post: {report.post_name || 'Unknown Post'}</p>
                                    <p className="truncate max-w-[200px]" title={report.content}>
                                      "{report.content || 'No comment text'}"
                                    </p>
                                  </div>
                                )
                                : report.content || 'Unknown Post'
                              }
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <FaUser className="text-gray-400 mr-2" />
                              {report.reporter || 'Unknown User'}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <FaUser className="text-gray-400 mr-2" />
                              {report.content_owner || 'Unknown User'}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            {getStatusBadge(report.status)}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">{formatDate(report.created_at)}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <button
                                className="text-blue-500 hover:text-blue-700"
                                title="View Related Content"
                                onClick={() => handleViewPost(report.post_id)}
                              >
                                <FaEye />
                              </button>
                              {report.status === 'pending' && (
                                <>
                                  <button
                                    className="text-green-500 hover:text-green-700"
                                    title="Mark as Resolved"
                                    onClick={() => handleUpdateStatus(report.id, 'resolved')}
                                  >
                                    <FaCheck />
                                  </button>
                                  <button
                                    className="text-yellow-500 hover:text-yellow-700"
                                    title="Reject Report"
                                    onClick={() => handleUpdateStatus(report.id, 'rejected')}
                                  >
                                    <FaTimes />
                                  </button>
                                </>
                              )}
                              <button
                                className="text-red-500 hover:text-red-700"
                                title="Delete"
                                onClick={() => handleDeleteReport(report.id)}
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
                
                {filteredReports.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No reports found.
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

export default ReportList; 