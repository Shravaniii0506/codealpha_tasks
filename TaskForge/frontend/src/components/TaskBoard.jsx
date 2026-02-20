import { useEffect, useState } from "react";

export default function TaskBoard({ projectId }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    const res = await fetch(
      `http://localhost:5000/api/tasks/project/${projectId}`
    );
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        projectId
      })
    });
    setTitle("");
    loadTasks();
  };

  const updateStatus = async (id, status) => {
    await fetch(
      `http://localhost:5000/api/tasks/${id}/status`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      }
    );
    loadTasks();
  };

  return (
    <>
      <input
        placeholder="New Task"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={addTask}>Add</button>

      <div className="board">
        {["TODO", "DOING", "DONE"].map(status => (
          <div key={status} className="column">
            <h3>{status}</h3>

            {tasks
              .filter(t => t.status === status)
              .map(t => (
                <div key={t._id} className="task">
                  <p>{t.title}</p>

                  <select
                    value={t.status}
                    onChange={e =>
                      updateStatus(t._id, e.target.value)
                    }
                  >
                    <option value="TODO">TODO</option>
                    <option value="DOING">DOING</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
}