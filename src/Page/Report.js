import React, { useState } from 'react';

function ReportPopup({ closePopup }) {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');

  const reasons = [
    'Spam or misleading',
    'Hate speech or symbols',
    'Harassment or bullying',
    'Violence or dangerous acts',
    'Nudity or sexual content',
    'Something else',
  ];

  const handleReport = () => {
    if (!selectedReason) {
      alert('Please select a reason for the report.');
      return;
    }
    const reportDetails = customReason
      ? `${selectedReason}: ${customReason}`
      : selectedReason;
    console.log('Report submitted:', reportDetails);
    closePopup();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-[9999]">
      <div className="bg-white w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] p-6 sm:p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Report Comment</h2>
        <div className="space-y-4">
          {reasons.map((reason) => (
            <label key={reason} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                value={reason}
                checked={selectedReason === reason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="form-radio text-blue-500 h-5 w-5"
              />
              <span className="text-lg text-gray-800">{reason}</span>
            </label>
          ))}
        </div>
        {selectedReason === 'Something else' && (
          <textarea
            className="w-full h-32 p-3 mt-6 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-gray-800"
            placeholder="Explain the issue..."
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
          ></textarea>
        )}
        <div className="mt-6 flex justify-between sm:justify-end space-x-4">
          <button
            onClick={closePopup}
            className="px-6 py-3 bg-gray-300 rounded-lg hover:bg-gray-400 text-lg w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            onClick={handleReport}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 text-lg w-full sm:w-auto"
          >
            Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportPopup;
