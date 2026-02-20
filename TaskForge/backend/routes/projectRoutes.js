const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/authMiddleware");

// CREATE PROJECT
router.post("/", auth, async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user.id,
      members: [req.user.id], // creator automatically member
    });

    const savedProject = await project.save();
    res.json(savedProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET USER PROJECTS
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({
      members: { $in: [req.user.id] },
    }).populate("members", "name email");

    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ADD MEMBER
router.post("/:id/add-member", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (!project.members.includes(req.body.userId)) {
      project.members.push(req.body.userId);
      await project.save();
    }

    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;