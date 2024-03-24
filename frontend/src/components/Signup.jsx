import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "./../api";
import useNotification from "../utils/notify.js";
import "./../style/signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const notify = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      notify("error", "Passwords do not match!");
      return;
    }
    try {
      await signup({ username, password });
      notify("success", "Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
      notify("error", "Registration failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
