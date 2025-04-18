import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function Comment({ closePopup, replyToName = 'Post', parentCommentId = null }) {
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams(); // Get the post ID from URL parameters
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  
  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleComment = async (commentText, closePopup) => {
    if (!commentText.trim()) {
      alert('Please enter a comment before posting.');
      return;
    }

    try {
      setIsSubmitting(true);
      // Get the current user from localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        alert('Please log in to comment');
        return;
      }

      // Create the comment data
      const commentData = {
        name: commentText,
        post_id: id,
        owner_id: user.id
      };

      // Only add parent_comment_id if it exists (for replies)
      if (parentCommentId !== null) {
        commentData.parent_comment_id = parentCommentId;
      }

      const response = await fetch(`${API_URL}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to post comment');
      }

      if (data.status) {
        closePopup();
        // Refresh the page to show the new comment
        window.location.reload();
      } else {
        throw new Error(data.message || 'Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
      alert(error.message || 'Failed to post comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white w-[1150px] p-6 sm:p-8 md:w-[80%] lg:w-[60%] xl:w-[60%] rounded-lg shadow-2xl">
        {/* Header */}
        <h2 className="text-black text-center p-6 rounded-t-lg text-3xl font-bold">Discussion</h2>

        {/* Reply Section */}
        <div className="p-6">
          <p className="text-md text-gray-700 mb-3">Reply to: {replyToName}</p>
          <textarea
            className="w-full h-40 border rounded-md p-3 text-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            placeholder="Type something..."
            value={commentText}
            onChange={handleChange}
            disabled={isSubmitting}
          ></textarea>

          {/* Attachment Section */}
          <div className="mt-6">
            <label className="text-md text-gray-500 block mb-2">Attachment</label>
            <input
              type="file"
              className="w-full border rounded-md p-3 text-sm focus:outline-none text-gray-800"
              disabled={isSubmitting}
            />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-between sm:justify-end space-x-4">
            <button
              onClick={closePopup}
              className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 text-lg w-full sm:w-auto"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              onClick={() => handleComment(commentText, closePopup)}
              className={`px-6 py-3 bg-orange-500 text-white rounded-lg text-lg w-full sm:w-auto ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
