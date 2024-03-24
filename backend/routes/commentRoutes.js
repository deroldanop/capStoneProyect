const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");
const {authenticateToken} = require("../middlewares/auth");

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { newsTitle, text } = req.body;
    const comment = new Comment({ newsTitle, username: req.auth.username, text });
    await comment.save();
    res.json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:newsTitle", async (req, res) => {
  try {
    const { newsTitle } = req.params;
    const comments = await Comment.find({ newsTitle });
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update a comment
router.put("/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(commentId, { text }, { new: true });
    res.json(updatedComment);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a comment
router.delete("/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (req.auth.username !== comment.username) {
      return res.status(403).json({ message: "Forbidden" });
    }
    -await Comment.findByIdAndDelete(commentId);
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
