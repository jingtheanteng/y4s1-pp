import React, { useState } from 'react';
import { useTheme } from './ThemeContext';

function ReportPopup({ closePopup }) {
  const [selectedReason, setSelectedReason] = useState('');
  const [customReason, setCustomReason] = useState('');
  const { theme } = useTheme();

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
      <div className={`w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] p-6 sm:p-8 rounded-lg shadow-2xl ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}>
        <h2 className={`text-2xl font-bold mb-6 text-center ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}>
          Report Comment
        </h2>
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
            className={`px-6 py-3 rounded-lg text-lg w-full sm:w-auto transition-colors ${
              theme === "dark"
              ? "bg-gray-700 hover:bg-gray-600 text-white"
              : "bg-gray-300 hover:bg-gray-400 text-gray-800"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleReport}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 text-lg w-full sm:w-auto transition-colors"
          >
            Report
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportPopup;
