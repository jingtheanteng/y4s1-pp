import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaUsers, FaClipboard, FaChartBar, FaCog, FaComments, FaFileAlt, FaFolder, FaUniversity, FaBuilding } from 'react-icons/fa';

function AdminSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6 border-b pb-2">Admin Dashboard</h2>
      <nav>
        <ul className="space-y-3">
          <li>
            <a 
              href="/admin" 
              className={`flex items-center p-2 rounded ${
                (currentPath === '/admin' || currentPath === '/admin/') 
                  ? 'bg-blue-600 text-white font-bold' 
                  : 'hover:bg-gray-700'
              }`}
            >
              <FaChartBar className="mr-3" />
              <span>Dashboard</span>
              {(currentPath === '/admin' || currentPath === '/admin/') && (
                <span className="ml-auto h-2 w-2 rounded-full bg-white"></span>
              )}
            </a>
          </li>
          <li>
            <a 
              href="/admin/users" 
              className={`flex items-center p-2 rounded ${
                currentPath.includes('/admin/users') 
                  ? 'bg-blue-600 text-white font-bold' 
                  : 'hover:bg-gray-700'
              }`}
            >
              <FaUsers className="mr-3" />
              <span>Users</span>
              {currentPath.includes('/admin/users') && (
                <span className="ml-auto h-2 w-2 rounded-full bg-white"></span>
              )}
            </a>
          </li>
          <li>
            <a 
              href="/admin/posts" 
              className={`flex items-center p-2 rounded ${
                currentPath.includes('/admin/posts') 
                  ? 'bg-blue-600 text-white font-bold' 
                  : 'hover:bg-gray-700'
              }`}
            >
              <FaClipboard className="mr-3" />
              <span>Posts</span>
              {currentPath.includes('/admin/posts') && (
                <span className="ml-auto h-2 w-2 rounded-full bg-white"></span>
              )}
            </a>
          </li>
          <li>
            <a 
              href="/admin/category" 
              className={`flex items-center p-2 rounded ${
                currentPath.includes('/admin/category') 
                  ? 'bg-blue-600 text-white font-bold' 
                  : 'hover:bg-gray-700'
              }`}
            >
              <FaFolder className="mr-3" />
              <span>Category</span>
              {currentPath.includes('/admin/category') && (
                <span className="ml-auto h-2 w-2 rounded-full bg-white"></span>
              )}
            </a>
          </li>
          <li>
            <a 
              href="/admin/department" 
              className={`flex items-center p-2 rounded ${
                currentPath.includes('/admin/department') 
                  ? 'bg-blue-600 text-white font-bold' 
                  : 'hover:bg-gray-700'
              }`}
            >
              <FaBuilding className="mr-3" />
              <span>Department</span>
              {currentPath.includes('/admin/department') && (
                <span className="ml-auto h-2 w-2 rounded-full bg-white"></span>
              )}
            </a>
          </li>
          <li>
            <a 
              href="/admin/faculty" 
              className={`flex items-center p-2 rounded ${
                currentPath.includes('/admin/faculty') 
                  ? 'bg-blue-600 text-white font-bold' 
                  : 'hover:bg-gray-700'
              }`}
            >
              <FaUniversity className="mr-3" />
              <span>Faculty</span>
              {currentPath.includes('/admin/faculty') && (
                <span className="ml-auto h-2 w-2 rounded-full bg-white"></span>
              )}
            </a>
          </li>
          <li>
            <a 
              href="/admin/comments" 
              className={`flex items-center p-2 rounded ${
                currentPath.includes('/admin/comments') 
                  ? 'bg-blue-600 text-white font-bold' 
                  : 'hover:bg-gray-700'
              }`}
            >
              <FaComments className="mr-3" />
              <span>Comments</span>
              {currentPath.includes('/admin/comments') && (
                <span className="ml-auto h-2 w-2 rounded-full bg-white"></span>
              )}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminSidebar; 