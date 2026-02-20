const router = require("express").Router();
const Comment = require("../models/Comment");

// Add Comment
router.post("/", async (req, res) => {
  const comment = await Comment.create(req.body);
  res.json(comment);
});

// Get Comments by Task
router.get("/:taskId", async (req, res) => {
  const comments = await Comment.find({ taskId: req.params.taskId })
    .populate("userId", "name");
  res.json(comments);
});

module.exports = router;