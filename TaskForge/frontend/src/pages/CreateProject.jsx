import { useState } from "react";
import axios from "../api";

export default function CreateProject() {
  const [name, setName] = useState("");
  const token = localStorage.getItem("token");

  const createProject = async () => {
    if (!name.trim()) {
      alert("Project name required");
      return;
    }

    try {
      await axios.post(
        "/projects",
        { name },
        {
          headers: {
            Authorization: token
          }
        }
      );

      alert("Project Created Successfully ✅");
      window.location.href = "/dashboard";
    } catch (err) {
      console.log(err);
      alert("Error creating project");
    }
  };

  return (
    <div className="center-box">
      <h2>Create New Project</h2>

      <input
        type="text"
        placeholder="Enter project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={createProject}>
        Create Project
      </button>
    </div>
  );
}