import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import '../App.css';
import Header from '../Components/Header';

function Notification() {
    const navigate = useNavigate();
    const { theme } = useTheme();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [clearing, setClearing] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('user'));
                
                if (!userData || !userData.id) {
                    console.log('No user data found, redirecting to login');
                    navigate('/loginregister');
                    return;
                }

                const response = await fetch(`http://localhost:5001/notifications/${userData.id}`);
                const data = await response.json();
                
                if (data.status) {
                    setNotifications(data.data || []);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, [navigate]);

    const handlePostClick = async (postId, notificationId) => {
        try {
            // Mark notification as read
            await fetch(`http://localhost:5001/notifications/${notificationId}/read`, {
                method: 'PUT'
            });
            
            // Navigate to post detail page
            navigate(`/post-detail/${postId}`);
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const handleClearAll = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            
            if (!userData || !userData.id) return;
            
            setClearing(true);
            const response = await fetch(`http://localhost:5001/notifications/${userData.id}/clear`, {
                method: 'DELETE'
            });
            const data = await response.json();
            
            if (data.status) {
                setNotifications([]);
            }
        } catch (error) {
            console.error('Error clearing notifications:', error);
        } finally {
            setClearing(false);
        }
    };

    const formatTimeAgo = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const timezoneOffset = date.getTimezoneOffset();
        const localDate = new Date(date.getTime() - (timezoneOffset * 60 * 1000));
        const diffInSeconds = Math.floor((now - localDate) / 1000);
        
        if (diffInSeconds < 60) return 'just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
    };

    return (
        <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
            <Header />

            <div className={`flex-1 container mx-auto p-6 ${theme === "dark" ? "text-white" : "text-black"}`}>
                <main className="flex-1">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className={`text-3xl font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
                            Notifications
                        </h1>
                        {notifications.length > 0 && (
                            <button 
                                onClick={handleClearAll}
                                disabled={clearing}
                                className={`px-4 py-2 rounded-md ${
                                    theme === "dark" 
                                        ? "bg-red-600 hover:bg-red-700 text-white" 
                                        : "bg-red-500 hover:bg-red-600 text-white"
                                } transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {clearing ? 'Clearing...' : 'Clear All'}
                            </button>
                        )}
                    </div>

                    {loading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                            <p className="mt-2">Loading notifications...</p>
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-lg shadow-sm">
                            <div className="text-gray-500">
                                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                                <p className="mt-1 text-sm text-gray-500">You don't have any notifications yet.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    onClick={() => handlePostClick(notification.post_id, notification.id)}
                                    className={`p-4 rounded-lg shadow-md cursor-pointer transition duration-150 hover:shadow-lg ${
                                        theme === "dark" 
                                            ? notification.is_read 
                                                ? "bg-gray-800 hover:bg-gray-700" 
                                                : "bg-gray-700 hover:bg-gray-600"
                                            : notification.is_read 
                                                ? "bg-gray-100 hover:bg-gray-200" 
                                                : "bg-blue-50 hover:bg-blue-100"
                                    }`}
                                >
                                    {notification.commenter_name && notification.post_name ? (
                                        <>
                                            <p className={`font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
                                                {notification.commenter_name} {notification.is_reply ? 'replied to your comment on' : 'commented on your post'}: {notification.post_name}
                                            </p>
                                            <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                                {notification.comment_text}
                                            </p>
                                            <span className={`text-xs mt-2 block ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                {formatTimeAgo(notification.created_at)}
                                            </span>
                                        </>
                                    ) : (
                                        <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                            This notification is no longer available
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Notification;
