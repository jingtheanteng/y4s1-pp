import React, { useState, useEffect } from "react";
import { FaRegComment } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { GrAnnounce } from "react-icons/gr";
import CommentPopup from './Comment'; // Import the Popup component
import ReportPopup from './Report'; // Import the Popup component
import '../App.css';
import Header from '../components/Header';

function PostDetail() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the post ID from URL parameters
  const [likes, setLikes] = useState(10); // Initial like count
  const [post, setPost] = useState(null); // State to store post data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  
  const [showPopup, setShowCommentPopup] = useState(false); // Popup visibility
  const [showReportPopup, setShowReportPopup] = useState(false); // State for Report popup
  const [comment, setComment] = useState(10); // Initial comment count
  
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  
  // Fetch post details when component mounts
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/post/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post details');
        }
        const data = await response.json();
        if (data.status) {
          setPost(data.data);
          setLikes(data.data.like_count);
          setComment(data.data.comment_count);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching post details:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPostDetails();
  }, [id, API_URL]);
  
  const handleLike = () => setLikes(likes + 1); // Increment like count
  
  const handleComment = () => {
    setComment(comment + 1); // Increment comment count
    setShowCommentPopup(true); // Show the popup
  };
  const closePopup = () => setShowCommentPopup(false);

  const handleReport = () => setShowReportPopup(true); // Show Report popup
  const closeReportPopup = () => setShowReportPopup(false); // Close Report popup

  if (loading) return <div className="text-center mt-10">Loading post details...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  if (!post) return <div className="text-center mt-10">Post not found</div>;

  return (
    <div className="bg-white text-white font-sans min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Post Section */}
      <div className="max-w-6xl text-black rounded-md border-2 border-black container mx-auto mt-12">
        <div className="bg-white p-4 rounded-lg">
          <div className="flex justify-between bg-gray-800 p-4 rounded-xl shadow-md flex-col space-y-3 h-36">
            <h3 className="text-lg font-semibold text-white mb-1">
              {post.name}
            </h3>     
            {/*Stats */}
            <div className="flex justify-center items-center text-gray-400 text-sm">
              <span>Posted {new Date(post.created_at).toLocaleDateString()}</span>
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
              <p className="text-black text-sm font-semibold">{post.owner_name}</p>
              <p className="text-gray-400 text-xs">{new Date(post.created_at).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="mt-2 space-y-2">
            <p>{post.description}</p>
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
      </div>

      {/* Popup component */}
      {showPopup && <CommentPopup closePopup={closePopup} />}
      {showReportPopup && <ReportPopup closePopup={closeReportPopup} />}
    </div>
  );
}

export default PostDetail;
