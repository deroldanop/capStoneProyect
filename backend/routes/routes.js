const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const Comment = require("../models/Comment");
const {jwtSecret} = require("../config");

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username is already taken
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ username }, jwtSecret, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logout successful" });
});

// NEWS API
router.get("/news", async (req, res) => {
  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        country: "us",
        apiKey: process.env.NEWS_API_KEY,
      },
    });
    const newsWithCommentsCount = await Promise.all(
      response.data.articles.map(async (article) => {
        const commentsCount = await Comment.countDocuments({ newsTitle: article.title });
        return { ...article, commentsCount };
      })
    );

    res.json({articles: newsWithCommentsCount});
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/news-by-id", async (req, res) => {
  try {
    // Make request to News API to fetch latest news
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: req.query.title,
        searchIn: "title",
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    // Send the response data (news articles) back to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
