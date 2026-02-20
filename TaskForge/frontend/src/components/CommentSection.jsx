import { useEffect, useState } from "react";

export default function CommentSection({ taskId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const token = localStorage.getItem("token");

  // Load comments for a task
  const loadComments = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/comments/${taskId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.log("Error loading comments:", err);
    }
  };

  useEffect(() => {
    if (taskId) {
      loadComments();
    }
  }, [taskId]);

  // Add comment
  const addComment = async () => {
    if (!text.trim()) return;

    try {
      await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          text,
          taskId,
        }),
      });

      setText("");
      loadComments();
    } catch (err) {
      console.log("Error adding comment:", err);
    }
  };

  return (
    <div
      style={{
        marginTop: "10px",
        padding: "10px",
        background: "#f4f5f7",
        borderRadius: "6px",
      }}
    >
      <h4 style={{ marginBottom: "8px" }}>Comments</h4>

      {/* Comment List */}
      <div style={{ maxHeight: "120px", overflowY: "auto" }}>
        {comments.length === 0 && (
          <p style={{ fontSize: "13px" }}>No comments yet.</p>
        )}

        {comments.map((comment) => (
          <div
            key={comment._id}
            style={{
              background: "white",
              padding: "6px",
              marginBottom: "6px",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          >
            {comment.text}
          </div>
        ))}
      </div>

      {/* Add Comment */}
      <div style={{ display: "flex", marginTop: "8px" }}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ flex: 1, marginRight: "5px" }}
        />
        <button onClick={addComment}>Post</button>
      </div>
    </div>
  );
}