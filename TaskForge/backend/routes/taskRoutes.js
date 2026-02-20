const router = require("express").Router();
const Task = require("../models/Task");

// Create Task
router.post("/", async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

// Get Tasks by Project
router.get("/project/:projectId", async (req, res) => {
  const tasks = await Task.find({ projectId: req.params.projectId })
    .populate("assignedTo", "name");
  res.json(tasks);
});

// Update Status
router.put("/:id/status", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(task);
});

module.exports = router;