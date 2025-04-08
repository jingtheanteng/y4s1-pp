import React from 'react';
import Header from '../components/Header';
import AdminSidebar from './components/AdminSidebar';

function Home() {
  return (
    <>
      <Header />
      <div className="flex">
        <AdminSidebar />
        
        {/* Main Content */}
        <div className="flex-1 bg-gray-100 p-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, Admin!</h1>
            <p className="text-lg text-gray-600 mb-6">Manage your platform from this dashboard.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-lg shadow border border-blue-100">
                <h3 className="text-xl font-semibold mb-2">User Management</h3>
                <p className="text-gray-600">View, edit, and manage user accounts</p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg shadow border border-green-100">
                <h3 className="text-xl font-semibold mb-2">Content Moderation</h3>
                <p className="text-gray-600">Review and moderate community content</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg shadow border border-purple-100">
                <h3 className="text-xl font-semibold mb-2">Analytics</h3>
                <p className="text-gray-600">Track platform usage and performance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
