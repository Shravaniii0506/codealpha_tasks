import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api";

export default function Task() {
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const loadTasks = async () => {
    const res = await axios.get(`/tasks/project/${projectId}`, {
      headers: { Authorization: token }
    });
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const createTask = async () => {
    if (!title) return alert("Enter task title");

    await axios.post(
      "/tasks",
      {
        title,
        description,
        projectId
      },
      { headers: { Authorization: token } }
    );

    setTitle("");
    setDescription("");
    loadTasks();
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `/tasks/${id}/status`,
      { status },
      { headers: { Authorization: token } }
    );
    loadTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`/tasks/${id}`, {
      headers: { Authorization: token }
    });
    loadTasks();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Project Tasks</h2>

      {/* Create Task */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button onClick={createTask}>Add Task</button>
      </div>

      {/* Task Board */}
      <div style={{ display: "flex", gap: "20px" }}>
        {["TODO", "DOING", "DONE"].map(status => (
          <div
            key={status}
            style={{
              flex: 1,
              background: "#f4f5f7",
              padding: "10px",
              borderRadius: "8px"
            }}
          >
            <h3>{status}</h3>

            {tasks
              .filter(task => task.status === status)
              .map(task => (
                <div
                  key={task._id}
                  style={{
                    background: "white",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "6px"
                  }}
                >
                  <strong>{task.title}</strong>
                  <p>{task.description}</p>

                  <select
                    value={task.status}
                    onChange={e =>
                      updateStatus(task._id, e.target.value)
                    }
                  >
                    <option value="TODO">To Do</option>
                    <option value="DOING">Doing</option>
                    <option value="DONE">Done</option>
                  </select>

                  <button
                    style={{
                      marginLeft: "10px",
                      background: "red"
                    }}
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}