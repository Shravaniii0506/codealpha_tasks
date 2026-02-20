import { useState } from "react";
import axios from "axios";
import logo from "../assets/taskforge-logo.png";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password
      });

      alert("Registered Successfully");
      window.location.href = "/";
    } catch (err) {
      alert("Error Registering");
    }
  };

  return (
    <div className="center-box">
      <img src={logo} width="120" />
      <h2>TaskForge</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={registerUser}>Register</button>
    </div>
  );
}