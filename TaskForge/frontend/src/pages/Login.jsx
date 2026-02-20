import { useState } from "react";
import axios from "axios";
import logo from "../assets/taskforge-logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="center-box">
      <img src={logo} width="120" />
      <h2>TaskForge</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={loginUser}>Login</button>

      <p>
        New user? <a href="/register">Register</a>
      </p>
    </div>
  );
}