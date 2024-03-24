import { useState } from "react";
import { login } from "./../api";
import useNotification from "../utils/notify.js";
import { useAuth } from "../context/AuthContext.jsx";
import "./../style/login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const notify = useNotification();
  const { updateUserData } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      console.log(response);
      if (response?.data) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        notify("success", "Login successful!");
        updateUserData();
        navigate("/news");
      } else {
        notify("error", `Unexpected error when login`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      notify("error", `Error logging in: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
