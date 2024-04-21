import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Blog.css"; // Import CSS file for styling
import Layout from "../Layout/Layout";

const NewsBlogPage = () => {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines",
          {
            params: {
              country: "us",
              apiKey: "e8993a9413ad43f0830f6963827c007a", // Replace with your NewsAPI API key
            },
          }
        );
        setNews(response.data.articles);
      } catch (error) {
        setError("Failed to fetch news. Please try again later.");
      }
    };

    fetchNews();
  }, []);

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <Layout>
    <div className="news-container">
      <h1 className="news-title">Latest News</h1>
      <div className="news-grid">
        {news.map((article, index) => (
          <div className="news-item" key={index}>
            <img
              className="news-item-image"
              src={article.urlToImage}
              alt={article.title}
            />

            <div className="news-item-content">
              <h2 className="news-item-title">{article.title}</h2>
              <p className="news-item-description">{article.description}</p>
              <a
                className="news-item-link"
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default NewsBlogPage;
