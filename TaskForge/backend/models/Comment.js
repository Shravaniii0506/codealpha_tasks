const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: String,
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Comment", commentSchema);