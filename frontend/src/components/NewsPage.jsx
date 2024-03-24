import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  getNewsByTitle,
  getCommentsByNewsTitle,
  deleteComment,
  createComment,
} from "./../api";
import "./../style/newsPage.css";
import useHandleApiErrors from "../utils/handleApiErrors.js";
import { useAuth } from "../context/AuthContext.jsx";

const NewsPage = () => {
  const { title } = useParams();
  const [news, setNews] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const handleApiError = useHandleApiErrors();
  const { isAuthorized, currentUser } = useAuth();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNewsByTitle(title);
        setNews(response.articles[0]);
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchNews();
  }, [title]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await getCommentsByNewsTitle(title);
        setComments(response);
      } catch (error) {
        handleApiError(error);
      }
    };

    if (isAuthorized) {
      fetchComments();
    }
  }, [title, isAuthorized]);

  const handleCommentSubmit = async () => {
    try {
      await createComment({
        newsTitle: title,
        username: currentUser,
        text: newComment,
      });
      setNewComment("");
      const updatedComments = await getCommentsByNewsTitle(title);
      setComments(updatedComments);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      if (confirm("Are you sure you want to delete this comment?")) {
        await deleteComment(commentId);
        const updatedComments = await getCommentsByNewsTitle(title);
        setComments(updatedComments);
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const isCurrentUsersComment = (comment) => {
    return currentUser.username === comment.username;
  };

  if (!news) {
    return (
      <div className="news-page-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="news-page-container">
      {news && (
        <div>
          <div className="news-image-container">
            <img
              src={news.urlToImage}
              alt={news.title}
              className="news-image"
            />
          </div>
          <h2 className="news-title">{news.title}</h2>
          <p className="news-description">{news.description}</p>
          <p className="news-author">
            <b>Author</b>: {news.author}
          </p>
          <p className="news-original-link">
            <b>Original URL</b>: <a href={news.url}>{news.url}</a>
          </p>
          <p className="news-source">
            <b>Source</b>: {news.source.name}
          </p>
          <p className="news-published-at">
            <b>Published at</b>: {formatTimestamp(news.publishedAt)}
          </p>
          <hr />
        </div>
      )}
      {isAuthorized && (
        <>
          <h3>Comments</h3>
          <ul className="comment-list">
            {comments.map((comment) => (
              <li key={comment._id} className="comment-item">
                <div className="comment-header">
                  <span
                    className={
                      isCurrentUsersComment(comment)
                        ? "username-bold"
                        : "comment-username"
                    }
                  >
                    {comment.username}
                  </span>
                  <span className="comment-time">
                    {formatTimestamp(comment.createdAt)}
                  </span>
                </div>
                <div className="comment-text">{comment.text}</div>
                {isCurrentUsersComment(comment) && (
                  <button
                    className="comment-delete-btn"
                    onClick={() => handleCommentDelete(comment._id)}
                  >
                    Delete
                  </button>
                )}
              </li>
            ))}
          </ul>
          <textarea
            className="new-comment-textarea"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add your comment..."
          ></textarea>
          <button className="submit-comment-btn" onClick={handleCommentSubmit}>
            Submit Comment
          </button>
        </>
      )}
      {!isAuthorized && (
        <h3 className="not-authorized">
          You are not authorized to view comments. Please log in to view
          comments.
        </h3>
      )}
    </div>
  );
};

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString();
}

export default NewsPage;
