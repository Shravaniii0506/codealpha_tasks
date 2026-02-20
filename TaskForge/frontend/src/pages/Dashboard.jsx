import { useEffect, useState } from "react";
import axios from "../api";
import TaskBoard from "../components/TaskBoard";
import logo from "../assets/taskforge-logo.png";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const token = localStorage.getItem("token");

  const loadProjects = async () => {
    const res = await axios.get("/projects", {
      headers: { Authorization: token }
    });
    setProjects(res.data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const createProject = async () => {
    if (!name.trim()) return alert("Enter project name");

    await axios.post(
      "/projects",
      { name },
      { headers: { Authorization: token } }
    );

    setName("");
    loadProjects();
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <div className="header">
        <div className="logo">
          <img src={logo} />
          <h3>TaskForge</h3>
        </div>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div style={{ padding: "20px" }}>
        <h2>Your Projects</h2>

        <input
          placeholder="New Project Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button onClick={createProject}>
          + Create Project
        </button>

        <ul>
          {projects.map(p => (
            <li
              key={p._id}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedProject(p)}
            >
              {p.name}
            </li>
          ))}
        </ul>

        {selectedProject && (
          <TaskBoard project={selectedProject} />
        )}
      </div>
    </>
  );
}