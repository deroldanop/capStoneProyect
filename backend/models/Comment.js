const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  newsTitle: { type: String, required: true },
  username: { type: String, required: true },
  text: { type: String, required: true },
}, { timestamps: true });

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
