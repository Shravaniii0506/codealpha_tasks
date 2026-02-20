const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  const { name } = req.body;

  const project = new Project({
    name,
    owner: req.userId,
    members: [req.userId],
  });

  await project.save();
  res.json(project);
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find({
    members: req.userId,
  });

  res.json(projects);
};