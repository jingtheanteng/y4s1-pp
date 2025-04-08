import React from 'react';
import { FaUsers, FaClipboard, FaChartBar, FaCog, FaComments, FaFileAlt } from 'react-icons/fa';

function AdminSidebar() {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6 border-b pb-2">Admin Dashboard</h2>
      <nav>
        <ul className="space-y-3">
          <li>
            <a href="/admin/users" className="flex items-center p-2 rounded hover:bg-gray-700">
              <FaUsers className="mr-3" />
              <span>Users</span>
            </a>
          </li>
          <li>
            <a href="/admin/posts" className="flex items-center p-2 rounded hover:bg-gray-700">
              <FaClipboard className="mr-3" />
              <span>Posts</span>
            </a>
          </li>
          <li>
            <a href="/admin/comments" className="flex items-center p-2 rounded hover:bg-gray-700">
              <FaComments className="mr-3" />
              <span>Comments</span>
            </a>
          </li>
          <li>
            <a href="/admin/communities" className="flex items-center p-2 rounded hover:bg-gray-700">
              <FaFileAlt className="mr-3" />
              <span>Communities</span>
            </a>
          </li>
          <li>
            <a href="/admin/analytics" className="flex items-center p-2 rounded hover:bg-gray-700">
              <FaChartBar className="mr-3" />
              <span>Analytics</span>
            </a>
          </li>
          <li>
            <a href="/admin/settings" className="flex items-center p-2 rounded hover:bg-gray-700">
              <FaCog className="mr-3" />
              <span>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminSidebar; 