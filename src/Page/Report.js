import React, { useState } from 'react';
import { useTheme } from './ThemeContext';

function ReportPopup({ closePopup, postId, commentId, reporterId, contentType = "post", contentPreview = "" }) {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();
  
  const reasons = [
    'Spam or misleading',
    'Hate speech or symbols',
    'Harassment or bullying',
    'Violence or dangerous acts',
    'Nudity or sexual content',
    'Something else',
  ];

  const handleReport = async () => {
    if (!selectedReason) {
      alert('Please select a reason for the report.');
      return;
    }
    
    if (!reporterId) {
      alert('Missing user information.');
      return;
    }
    
    if ((!postId && !commentId) || (contentType === "post" && !postId) || (contentType === "comment" && !commentId)) {
      alert('Missing content information.');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const response = await fetch('http://localhost:5001/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: contentType,
          reason: selectedReason,
          description: selectedReason === 'Something else' ? customReason : '',
          post_id: postId,
          comment_id: commentId,
          reporter_id: reporterId
        }),
      });

      const data = await response.json();
      
      if (data.status) {
        alert('Report submitted successfully. Thank you for your feedback.');
        closePopup();
      } else {
        alert(data.message || 'Failed to submit report. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-[9999]">
      <div className={`w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] p-6 sm:p-8 rounded-lg shadow-2xl ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}>
          Report {contentType === "comment" ? "Comment" : "Post"}
        </h2>
        
        {contentPreview && (
          <div className={`mb-6 p-3 rounded ${
            theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
          }`}>
            <p className="text-sm font-medium mb-1">Content being reported:</p>
            <p className="text-sm italic truncate">{contentPreview}</p>
          </div>
        )}
        
        <div className="space-y-4">
          {reasons.map((reason) => (
            <label key={reason} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                value={reason}
                checked={selectedReason === reason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="form-radio text-orange-500 h-5 w-5"
              />
              <span className={`text-lg ${
                theme === "dark" ? "text-gray-300" : "text-gray-800"
              }`}>
                {reason}
              </span>
            </label>
          ))}
        </div>
        {selectedReason === 'Something else' && (
          <textarea
            className={`w-full h-32 p-3 mt-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              theme === "dark"
              ? "bg-gray-700 text-gray-300 border-gray-600 placeholder-gray-400"
              : "bg-white text-gray-900 border-gray-300 placeholder-gray-500"
            }`}
            placeholder="Explain the issue..."
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
          ></textarea>
        )}
        <div className="mt-6 flex justify-between sm:justify-end space-x-4">
          <button
            onClick={closePopup}
            disabled={isSubmitting}
            className={`px-6 py-3 rounded-lg text-lg w-full sm:w-auto transition-colors ${
              theme === "dark"
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-300 hover:bg-gray-400 text-gray-800"
            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Cancel
          </button>
          <button
            onClick={handleReport}
            disabled={isSubmitting}
            className={`px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 text-lg w-full sm:w-auto transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Report'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportPopup;
