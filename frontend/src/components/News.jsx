import React, { useEffect, useState } from "react";
import { getNews } from "./../api";
import { Link } from "react-router-dom";
import "./../style/news.css";
import useHandleApiErrors from "../utils/handleApiErrors.js";

const News = () => {
  const [news, setNews] = useState([]);
  const handleApiError = useHandleApiErrors();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getNews();
        if (response?.articles.length) {
          setNews(response.articles);
        }
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchNews();
  }, []);

  if (!news?.length) {
    return (
      <div className="news-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="news-container">
      <h2 className="news-title">Latest News</h2>
      {news.map((article, index) => (
        <div className="news-article" key={index}>
          <h3>
            <Link to={`/news/${encodeURIComponent(article.title)}`}>
              {article.title}
            </Link>
          </h3>
          <p>{article.description}</p>
          <div className="news-footer">
            <p className="source">Source: {article.source.name}</p>
            <p>Comments: {article.commentsCount}</p>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default News;
