import { useState } from "react";

export default function Column({ title }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask]);
    setNewTask("");
  };

  const removeTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  return (
    <div className="column">
      <h3>{title}</h3>

      {tasks.map((task, index) => (
        <div key={index} className="task">
          {task}
          <span
            style={{ float: "right", cursor: "pointer", color: "red" }}
            onClick={() => removeTask(index)}
          >
            ✕
          </span>
        </div>
      ))}

      <input
        placeholder="New task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />

      <button className="add-task" onClick={addTask}>
        + Add Task
      </button>
    </div>
  );
}