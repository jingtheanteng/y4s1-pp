import React, { useState } from "react";
import { FaSearch, FaRegComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { GrAnnounce } from "react-icons/gr";
import CommentPopup from './Comment'; // Import the Popup component
import ReportPopup from './Report'; // Import the Popup component
import '../App.css';

function PostDetail() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [likes, setLikes] = useState(10); // Initial like count
  const handleLike = () => setLikes(likes + 1); // Increment like count
  const [showPopup, setShowCommentPopup] = useState(false); // Popup visibility
  const [showReportPopup, setShowReportPopup] = useState(false); // State for Report popup

  const [comment, setComment] = useState(10); // Initial like count
  
  const handleComment = () => {
    setComment(comment + 1); // Increment comment count
    setShowCommentPopup(true); // Show the popup
  };
  const closePopup = () => setShowCommentPopup(false);

  const handleReport = () => setShowReportPopup(true); // Show Report popup
  const closeReportPopup = () => setShowReportPopup(false); // Close Report popup

  const handleSignInClick = () => {
    navigate("/loginregister");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleCommunitiesClick = () => {
    navigate("/communities");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleSettingClick = () => {
    navigate("/setting");
  };

  const handleNotificationClick = () => {
    navigate("/notification");
  };

  return (
        <div className="bg-white text-white font-sans min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-700 p-4 sticky-header">
                <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                        <img src="logo.png" alt="Knowledgechain" className="w-10 h-10" />
                    </div>

                    {/* Search input between icons */}
                    <div className="flex flex-col lg:flex-row items-center space-x-0 lg:space-x-12 w-full lg:w-auto">
                        <div className="relative w-full lg:w-auto mb-4 lg:mb-0 flex justify-center">
                            {/* Dropdown for smaller screens */}
                            <div className="lg:hidden">
                                <button className="text-lg font-bold bg-blue-700 text-white px-4 py-2 rounded-md" onClick={() => setMenuOpen(!menuOpen)}>
                                    Menu
                                </button>
                                {menuOpen && (
                                    <div className="absolute left-1/2 transform -translate-x-1/2 bg-white text-black rounded-md shadow-lg mt-2 w-full">
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleHomeClick}>Home</span>
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleCommunitiesClick}>Communities</span>
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleProfileClick}>Profile</span>
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleSettingClick}>Settings</span>
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleNotificationClick}>Notifications</span>
                                        <span className="block cursor-pointer p-2 hover:bg-orange-500" onClick={handleSignInClick}>Sign In</span>
                                    </div>
                                )}
                            </div>
                            {/* Regular buttons for larger screens */}
                            <div className="hidden lg:flex items-center justify-between w-full lg:w-auto mb-4 lg:mb-0 space-x-8">
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleHomeClick}>Home</span>
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleCommunitiesClick}>Communities</span>
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleProfileClick}>Profile</span>
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleSettingClick}>Settings</span>
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleNotificationClick}>Notifications</span>
                                <span className="cursor-pointer text-lg text-white font-bold hover:text-orange-500" onClick={handleSignInClick}>Sign In</span>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar moved next to navigation items */}
                    <div className={`flex justify-center mt-4 lg:mt-0 lg:ml-4 ${menuOpen ? 'hidden' : ''}`}>
                        <div className="text-black relative w-full max-w-md">
                            <input
                                type="text"
                                placeholder="Type here to search"
                                className="w-full p-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2">
                                <FaSearch className="text-gray-500" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

        {/* Post Section */}
        <div className="max-w-6xl text-black rounded-md border-2 border-black container mx-auto mt-12">
              <div className="bg-white p-4 rounded-lg">
                  <div className="flex justify-between bg-gray-800 p-4 rounded-xl shadow-md flex-col space-y-3 h-36">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        OnePay - Online Payment Processing Web App - Download from uihut.com
                      </h3>     
                  {/*Stats */}
                  <div className="flex justify-center items-center text-gray-400 text-sm">
                      <span>Posted 1 Week Ago</span>
                  </div>
              </div>

              <div className="mt-4 flex items-center space-x-3">
                  <img
                  src="/images/profile.jpg"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={(e) => {
                      e.stopPropagation(); // Prevent the event from bubbling to the card
                      navigate('/view-profile');
                  }}
                  />
                  <div>
                  <p className="text-black text-sm font-semibold">Teng Jingthean</p>
                  <p className="text-gray-400 text-xs">1 week ago</p>
                  </div>
              </div>
              <div className="mt-2 space-y-2">
                  <p>Hello Everyone!</p>
                  <p>I would like to know about ITE major what should I learn?</p>
                  <p>Thanks guys!</p>
              </div>
              
              <div className="flex space-x-4 mt-4 text-black-400">
                  <button 
                      className="hover:text-orange flex items-center space-x-2"
                      onClick={handleLike}
                  >
                      <AiOutlineLike className="text-xl" /> {/* Increase icon size */}
                      <span>{likes}</span> {/* Display like count */}
                  </button>

                  <button 
                      className="hover:text-orage flex items-center space-x-2"
                      onClick={handleComment}
                  >
                      <FaRegComment  className="text-xl" /> {/* Increase icon size */}
                      <span>{comment}</span> {/* Display cmt count */}
                  </button>

                  <button 
                      className="hover:text-orage flex items-center space-x-2"
                      onClick={handleReport}
                  >
                      <GrAnnounce  className="text-xl" /> {/* Increase icon size */}
                      <span>Report</span> {/* Display cmt count */}
                  </button>
              </div>
          </div>
        </div>

        <div className="max-w-6xl text-black rounded-md border-2 border-black container mx-auto mt-4">
              <div className="bg-white p-4 rounded-lg">
              <div>
                  <p className="flex justify-center text-black text-md mt-2 mb-2">Replied 1 week ago</p>
              </div>
              <div className="mt-4 flex items-center space-x-3">
                  <img
                  src="/images/profile.jpg"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={(e) => {
                      e.stopPropagation(); // Prevent the event from bubbling to the card
                      navigate('/view-profile');
                  }}
                  />
                  <div>
                  <p className="text-black text-sm font-semibold">Teng Jingthean</p>
                  <p className="text-gray-400 text-xs">1 week ago</p>
                  </div>
              </div>
              <div className="mt-2">
                  <p>Hello Study Online Course is good for u!</p>
              </div>
              <div className="flex space-x-4 mt-4 text-black-400">
                  <button 
                  className="flex items-center space-x-2"
                  onClick={handleLike}
                  >
                      <AiOutlineLike className="text-xl" /> {/* Increase icon size */}
                      <span>{likes}</span> {/* Display like count */}
                  </button>

                  <button 
                      className="flex items-center space-x-2"
                      onClick={handleComment}
                  >
                      <FaRegComment  className="text-xl" /> {/* Increase icon size */}
                      <span>{comment}</span> {/* Display cmt count */}
                  </button>

                  <button 
                      className="flex items-center space-x-2"
                      onClick={handleReport}
                  >
                      <GrAnnounce  className="text-xl" /> {/* Increase icon size */}
                      <span>Report</span> {/* Display cmt count */}
                  </button>
            </div>
          </div>

          {/* Popup component */}
          {showPopup && <CommentPopup closePopup={closePopup} />}
          {showReportPopup && <ReportPopup closePopup={closeReportPopup} />}
        </div>
      </div>
  );
}

export default PostDetail;
