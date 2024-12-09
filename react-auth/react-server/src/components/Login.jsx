import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = "https://server-nu-brown.vercel.app";

      const response = await axios.post(`${apiUrl}/api/login`, {
        email,
        password,
      });

      // Store the token returned from the backend in localStorage after successful login
      localStorage.setItem("token", response.data.token);
      setMessage("Login successful!");
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("Invalid email or password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Login;
