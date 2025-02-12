import React, { useState } from 'react';

const handleComment = (commentText, closePopup) => {
  if (!commentText.trim()) {
    // Show an alert if the comment text is empty
    alert('Please enter a comment before posting.');
  } else {
    // Assuming you want to log the comment or perform an action
    console.log('Comment posted:', commentText);

    // Close the popup after posting the comment
    closePopup();
  }
};

function Comment({ closePopup }) {
  const [commentText, setCommentText] = useState('');
  
  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-[1150px] p-6 sm:p-8 md:w-[80%] lg:w-[60%] xl:w-[60%] rounded-lg shadow-2xl">
        {/* Header */}
        <h2 className="text-black text-center p-6 rounded-t-lg text-3xl font-bold">Discussion</h2>

        {/* Reply Section */}
        <div className="p-6">
          <p className="text-md text-gray-700 mb-3">Reply to: Oggy</p>
          <textarea
            className="w-full h-40 border rounded-md p-3 text-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type something..."
            value={commentText}
            onChange={handleChange}
          ></textarea>

          {/* Attachment Section */}
          <div className="mt-6">
            <label className="text-md text-gray-500 block mb-2">Attachment</label>
            <input
              type="file"
              className="w-full border rounded-md p-3 text-sm focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-between sm:justify-end space-x-4">
            <button
              onClick={closePopup}
              className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 text-lg w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              onClick={() => handleComment(commentText, closePopup)}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg text-lg w-full sm:w-auto"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
