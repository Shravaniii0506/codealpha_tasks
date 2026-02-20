const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const { title, description, projectId } = req.body;

  const task = new Task({
    title,
    description,
    project: projectId,
    assignedTo: req.userId,
  });

  await task.save();
  res.json(task);
};

exports.getTasksByProject = async (req, res) => {
  const tasks = await Task.find({ project: req.params.projectId });
  res.json(tasks);
};

exports.updateTaskStatus = async (req, res) => {
  const { status } = req.body;

  const task = await Task.findByIdAndUpdate(
    req.params.taskId,
    { status },
    { new: true }
  );

  res.json(task);
};

exports.deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.taskId);
  res.json({ message: "Task deleted" });
};