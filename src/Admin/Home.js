import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import AdminSidebar from './components/AdminSidebar';
import { FaUsers, FaClipboard, FaFlag, FaClock, FaChartLine, FaExclamationTriangle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function Home() {
  const [statistics, setStatistics] = useState({
    total_users: 0,
    total_posts: 0,
    total_reports: 0,
    reports_by_status: {}
  });
  const [timeFilter, setTimeFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const fetchStatistics = async (filter) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5001/admin/statistics?time_filter=${filter}`);
      const data = await response.json();
      
      if (data.status) {
        setStatistics(data.data);
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatistics(timeFilter);
  }, [timeFilter]);

  const handleTimeFilterChange = (e) => {
    setTimeFilter(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="flex min-h-screen">
        <AdminSidebar />
        
        {/* Main Content */}
        <div className="flex-1 bg-white">
          <div className="p-8">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
                <p className="text-gray-600 mt-1">Welcome to your admin dashboard</p>
              </div>
              <div className="flex items-center space-x-2">
                <FaClock className="text-gray-500" />
                <select
                  value={timeFilter}
                  onChange={handleTimeFilterChange}
                  className="border-0 bg-transparent focus:outline-none text-gray-600"
                >
                  <option value="all">All Time</option>
                  <option value="day">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                {/* Main Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Users Card */}
                  <div className="border-l-4 border-blue-500 bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-gray-600">Total Users</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{statistics.total_users}</p>
                        <p className="text-sm text-gray-500 mt-1">Active users in the system</p>
                      </div>
                      <FaUsers className="text-blue-500 text-2xl" />
                    </div>
                  </div>

                  {/* Posts Card */}
                  <div className="border-l-4 border-green-500 bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-gray-600">Total Posts</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{statistics.total_posts}</p>
                        <p className="text-sm text-gray-500 mt-1">Content created by users</p>
                      </div>
                      <FaClipboard className="text-green-500 text-2xl" />
                    </div>
                  </div>

                  {/* Reports Card */}
                  <div className="border-l-4 border-red-500 bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-gray-600">Total Reports</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{statistics.total_reports}</p>
                        <p className="text-sm text-gray-500 mt-1">User reports to review</p>
                      </div>
                      <FaFlag className="text-red-500 text-2xl" />
                    </div>
                  </div>
                </div>

                {/* Reports Overview */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Reports Overview</h2>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <FaChartLine />
                      <span className="text-sm">Status Distribution</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Pending Reports */}
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-yellow-800">Pending</h3>
                        <FaExclamationTriangle className="text-yellow-500" />
                      </div>
                      <p className="text-2xl font-bold text-yellow-600">
                        {statistics.reports_by_status.pending || 0}
                      </p>
                      <p className="text-sm text-yellow-700 mt-1">Reports awaiting review</p>
                    </div>

                    {/* Resolved Reports */}
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-green-800">Resolved</h3>
                        <FaCheckCircle className="text-green-500" />
                      </div>
                      <p className="text-2xl font-bold text-green-600">
                        {statistics.reports_by_status.resolved || 0}
                      </p>
                      <p className="text-sm text-green-700 mt-1">Reports successfully handled</p>
                    </div>

                    {/* Rejected Reports */}
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-medium text-red-800">Rejected</h3>
                        <FaTimesCircle className="text-red-500" />
                      </div>
                      <p className="text-2xl font-bold text-red-600">
                        {statistics.reports_by_status.rejected || 0}
                      </p>
                      <p className="text-sm text-red-700 mt-1">Reports marked as invalid</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
