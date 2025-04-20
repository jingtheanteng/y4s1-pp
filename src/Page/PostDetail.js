import React, { useState, useEffect } from "react";
import { FaRegComment } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { GrAnnounce } from "react-icons/gr";
import CommentPopup from './Comment'; // Import the Popup component
import ReportPopup from './Report'; // Import the Popup component
import '../App.css';
import Header from '../components/Header';
import { useTheme } from './ThemeContext';

function PostDetail() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the post ID from URL parameters
  const [likes, setLikes] = useState(0); // Initial like count
  const [isLiked, setIsLiked] = useState(false); // State to track if the post is liked
  const [post, setPost] = useState(null); // State to store post data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [comments, setComments] = useState([]);
  const [likedComments, setLikedComments] = useState({});
  const [replyToName, setReplyToName] = useState(''); // Track who we're replying to
  const [replyToId, setReplyToId] = useState(null); // Track which comment we're replying to
  const [replyToUserID, setReplyToUserID] = useState(null); // Track the user ID we're replying to
  
  const [showPopup, setShowCommentPopup] = useState(false); // Popup visibility
  const [showReportPopup, setShowReportPopup] = useState(false); // State for Report popup
  const [commentCount, setCommentCount] = useState(0); // Initial comment count
  
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  const { theme } = useTheme();
  
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    // Add 7 hours to adjust for GMT+7 (Bangkok timezone)
    date.setHours(date.getHours() + 7);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return date.toLocaleString('en-US', options);
  };
  
  // Fetch post details when component mounts
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(`${API_URL}/post/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post details');
        }
        const data = await response.json();
        if (data.status) {
          setPost(data.data);
          setLikes(data.data.like_count);
          
          // Check if the current user has liked the post
          if (user) {
            const likeCheckResponse = await fetch(`${API_URL}/post/${id}/likes?user_id=${user.id}`);
            const likeCheckData = await likeCheckResponse.json();
            setIsLiked(likeCheckData.status && likeCheckData.data.has_liked);
          } else {
            setIsLiked(false);
          }
          
          setCommentCount(data.data.comment_count);
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

    const fetchComments = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await fetch(`${API_URL}/comment?post_id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        if (data.status) {
          // Organize comments into parent comments and replies
          const parentComments = data.data.filter(comment => !comment.parent_comment_id);
          const replies = data.data.filter(comment => comment.parent_comment_id);
          
          // Create a map of comment authors for quick lookup
          const commentAuthors = {};
          data.data.forEach(comment => {
            commentAuthors[comment.id] = {
              owner_id: comment.owner_id,
              owner_name: comment.owner_name
            };
          });
          
          // Map a reply to its parent and store who is being replied to
          const repliesWithReplyInfo = replies.map(reply => {
            // Store parent information (defaults to parent comment owner)
            let replyInfo = {
              ...reply,
              // Default to the parent comment's author
              replied_to_id: commentAuthors[reply.parent_comment_id].owner_id,
              replied_to_name: commentAuthors[reply.parent_comment_id].owner_name
            };
            
            // If the content starts with a mention like "@username", extract it
            const mentionMatch = reply.name.match(/^@(\S+)/);
            if (mentionMatch) {
              // Look for the username in our commentAuthors
              const mentionedName = mentionMatch[1];
              // Find the comment author with this name
              const matchedAuthor = Object.values(commentAuthors).find(
                author => author.owner_name.toLowerCase() === mentionedName.toLowerCase()
              );
              
              if (matchedAuthor) {
                replyInfo.replied_to_id = matchedAuthor.owner_id;
                replyInfo.replied_to_name = matchedAuthor.owner_name;
              }
            }
            
            return replyInfo;
          });
          
          // Attach replies to their parent comments
          const commentsWithReplies = parentComments.map(comment => ({
            ...comment,
            replies: repliesWithReplyInfo.filter(reply => reply.parent_comment_id === comment.id)
          }));
          
          setComments(commentsWithReplies);
          
          // Initialize liked state for each comment and its replies
          if (user) {
            const initialLikedState = {};
            for (const comment of data.data) {
              // Check if user has liked the main comment
              const commentLikeResponse = await fetch(`${API_URL}/comment/${comment.id}/likes?user_id=${user.id}`);
              const commentLikeData = await commentLikeResponse.json();
              initialLikedState[comment.id] = commentLikeData.status && commentLikeData.data.has_liked;
            }
            setLikedComments(initialLikedState);
          } else {
            const initialLikedState = {};
            data.data.forEach(comment => {
              initialLikedState[comment.id] = false;
            });
            setLikedComments(initialLikedState);
          }
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };
    
    fetchPostDetails();
    fetchComments();
  }, [id, API_URL]);
  
  const handleLike = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        alert('Please log in to like posts');
        return;
      }

      const response = await fetch(`${API_URL}/post/${id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update like');
      }

      const data = await response.json();
      if (data.status) {
        // Update like count based on the action
        if (data.message === 'Post liked successfully') {
          setLikes(likes + 1);
          setIsLiked(true);
        } else if (data.message === 'Post unliked successfully') {
          setLikes(likes - 1);
          setIsLiked(false);
        }
      }
    } catch (error) {
      console.error('Error updating like:', error);
      alert('Failed to update like. Please try again.');
    }
  };

  const handleCommentLike = async (commentId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        alert('Please log in to like comments');
        return;
      }

      const response = await fetch(`${API_URL}/comment/${commentId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update comment like');
      }

      const data = await response.json();
      if (data.status) {
        // Update the liked state for this specific comment
        setLikedComments(prev => ({
          ...prev,
          [commentId]: !prev[commentId]
        }));
        
        // Update the like count in the comments array
        setComments(prevComments => 
          prevComments.map(comment => {
            // If this is the main comment being liked
            if (comment.id === commentId) {
              return {
                ...comment,
                like_count: likedComments[commentId] ? comment.like_count - 1 : comment.like_count + 1
              };
            }
            // If this comment has replies, check if the liked comment is a reply
            if (comment.replies) {
              return {
                ...comment,
                replies: comment.replies.map(reply =>
                  reply.id === commentId
                    ? {
                        ...reply,
                        like_count: likedComments[commentId] ? reply.like_count - 1 : reply.like_count + 1
                      }
                    : reply
                )
              };
            }
            return comment;
          })
        );
      }
    } catch (error) {
      console.error('Error updating comment like:', error);
      alert('Failed to update comment like. Please try again.');
    }
  };
  
  const handleComment = (replyTo = '', commentId = null, replyToUserId = null) => {
    setReplyToName(replyTo || post?.owner_name || 'Post');
    setReplyToId(commentId);
    setReplyToUserID(replyToUserId);
    setShowCommentPopup(true);
  };

  const closePopup = () => {
    setShowCommentPopup(false);
    setReplyToName('');
    setReplyToId(null);
    setReplyToUserID(null);
  };

  const handleReply = (comment) => {
    setReplyToName(comment.owner_name);
    setReplyToId(comment.id); // This will be used as parent_comment_id
    setReplyToUserID(comment.owner_id);
    setShowCommentPopup(true);
  };

  const handleReport = () => setShowReportPopup(true); // Show Report popup
  const closeReportPopup = () => setShowReportPopup(false); // Close Report popup

  if (loading) return <div className="text-center mt-10">Loading post details...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  if (!post) return <div className="text-center mt-10">Post not found</div>;

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <Header />
      <div className="flex-1 container mx-auto p-6">
        {/* Post Section */}
        <div className={`max-w-6xl rounded-md border-2 container mx-auto mt-12 ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}>
          <div className={`p-4 rounded-lg ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}>
            <div className={`p-4 rounded-xl shadow-md flex-col space-y-3 h-36 ${
              theme === "dark" ? "bg-gray-700" : "bg-gray-100"
            }`}>
              <h3 className={`text-lg font-semibold mb-1 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                {post?.name}
              </h3>     
              {/*Stats */}
              <div className={`flex justify-center items-center text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}>
                <span>Posted {new Date(new Date(post?.created_at).getTime() + 7 * 60 * 60 * 1000).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'Asia/Phnom_Penh'
                })}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-3">
              {post?.profile_picture ? (
                <img
                  src={`http://localhost:5001/uploads/${post.profile_picture}`}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full cursor-pointer object-cover"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/viewprofile/${post?.owner_id}`);
                  }}
                />
              ) : (
                <div 
                  className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/viewprofile/${post?.owner_id}`);
                  }}
                >
                  <span className="text-gray-500 text-xs">No Photo</span>
                </div>
              )}
              <div>
                <p className={`text-sm font-semibold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  {post?.owner_name}
                </p>
                <p className={`text-xs ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}>
                  {new Date(new Date(post?.created_at).getTime() + 7 * 60 * 60 * 1000).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Asia/Phnom_Penh'
                  })}
                </p>
              </div>
            </div>
            <div className="mt-2 space-y-2">
              <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                {post?.description}
              </p>
            </div>
            
            <div className="flex space-x-4 mt-4">
              <button 
                className={`flex items-center space-x-2 ${
                  isLiked ? 'text-orange-500' : theme === "dark" ? 'text-gray-400' : 'text-gray-600'
                } hover:text-orange-500 transition-colors`}
                onClick={handleLike}
              >
                {isLiked ? <AiFillLike className="text-xl" /> : <AiOutlineLike className="text-xl" />}
                <span>{likes}</span>
              </button>

              <button 
                className={`flex items-center space-x-2 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                } hover:text-orange-500 transition-colors`}
                onClick={() => handleComment()}
              >
                <FaRegComment className="text-xl" />
                <span>{commentCount}</span>
              </button>

              <button 
                className={`flex items-center space-x-2 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                } hover:text-orange-500 transition-colors`}
                onClick={handleReport}
              >
                <GrAnnounce className="text-xl" />
                <span>Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        {comments.map((comment) => (
          <div key={comment.id} className={`max-w-6xl rounded-md border-2 container mx-auto mt-4 ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}>
            <div className={`p-4 rounded-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}>
              <div className="mt-4 flex items-center space-x-3">
                {comment.profile_picture ? (
                  <img
                    src={`http://localhost:5001/uploads/${comment.profile_picture}`}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full cursor-pointer object-cover"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/viewprofile/${comment.owner_id}`);
                    }}
                  />
                ) : (
                  <div 
                    className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/viewprofile/${comment.owner_id}`);
                    }}
                  >
                    <span className="text-gray-500 text-xs">No Photo</span>
                  </div>
                )}
                <div>
                  <p className={`text-sm font-semibold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}>
                    {comment.owner_name}
                  </p>
                  <p className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {new Date(new Date(comment.created_at).getTime() + 7 * 60 * 60 * 1000).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      timeZone: 'Asia/Phnom_Penh'
                    })}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                  {comment.name}
                </p>
              </div>
              <div className="flex space-x-4 mt-4">
                <button 
                  className={`flex items-center space-x-2 ${
                    likedComments[comment.id] ? 'text-orange-500' : theme === "dark" ? 'text-gray-400' : 'text-gray-600'
                  } hover:text-orange-500 transition-colors`}
                  onClick={() => handleCommentLike(comment.id)}
                >
                  {likedComments[comment.id] ? <AiFillLike className="text-xl" /> : <AiOutlineLike className="text-xl" />}
                  <span>{comment.like_count}</span>
                </button>

                <button 
                  className={`flex items-center space-x-2 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  } hover:text-orange-500 transition-colors`}
                  onClick={() => handleReply(comment)}
                >
                  <FaRegComment className="text-xl" />
                  <span>Reply</span>
                </button>

                <button 
                  className={`flex items-center space-x-2 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  } hover:text-orange-500 transition-colors`}
                  onClick={handleReport}
                >
                  <GrAnnounce className="text-xl" />
                  <span>Report</span>
                </button>
              </div>

              {/* Replies Section */}
              {comment.replies && comment.replies.map((reply) => (
                <div key={reply.id} className="ml-12 mt-4 border-l-2 pl-4">
                  <div className="flex items-center space-x-3">
                    {reply.profile_picture ? (
                      <img
                        src={`http://localhost:5001/uploads/${reply.profile_picture}`}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full cursor-pointer object-cover"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/viewprofile/${reply.owner_id}`);
                        }}
                      />
                    ) : (
                      <div 
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/viewprofile/${reply.owner_id}`);
                        }}
                      >
                        <span className="text-gray-500 text-xs">No Photo</span>
                      </div>
                    )}
                    <div>
                      <div className="flex items-center space-x-1">
                        <p className={`text-sm font-semibold ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                          {reply.owner_name}
                        </p>
                        <span className={`text-sm ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}>Reply To:</span>
                        <p className={`text-sm font-semibold ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                          {reply.replied_to_name || comment.owner_name}
                        </p>
                      </div>
                      <p className={`text-xs ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}>
                        {new Date(new Date(reply.created_at).getTime() + 7 * 60 * 60 * 1000).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          timeZone: 'Asia/Phnom_Penh'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                      {reply.name.replace(/^@\S+\s+/, '')}
                    </p>
                  </div>
                  <div className="flex space-x-4 mt-2">
                    <button 
                      className={`flex items-center space-x-2 ${
                        likedComments[reply.id] ? 'text-orange-500' : theme === "dark" ? 'text-gray-400' : 'text-gray-600'
                      } hover:text-orange-500 transition-colors`}
                      onClick={() => handleCommentLike(reply.id)}
                    >
                      {likedComments[reply.id] ? <AiFillLike className="text-xl" /> : <AiOutlineLike className="text-xl" />}
                      <span>{reply.like_count}</span>
                    </button>

                    <button 
                      className={`flex items-center space-x-2 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      } hover:text-orange-500 transition-colors`}
                      onClick={() => handleComment(reply.owner_name, comment.id, reply.owner_id)}
                    >
                      <FaRegComment className="text-xl" />
                      <span>Reply</span>
                    </button>

                    <button 
                      className={`flex items-center space-x-2 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      } hover:text-orange-500 transition-colors`}
                      onClick={handleReport}
                    >
                      <GrAnnounce className="text-xl" />
                      <span>Report</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Popup components */}
        {showPopup && <CommentPopup 
          closePopup={closePopup} 
          replyToName={replyToName} 
          parentCommentId={replyToId} 
          replyToUserId={replyToUserID}
        />}
        {showReportPopup && <ReportPopup closePopup={closeReportPopup} />}
      </div>
    </div>
  );
}

export default PostDetail;
