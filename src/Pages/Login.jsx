import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(null); // New state to track success or failure
  const navigate = useNavigate();

  const goToRegister = () => {
    setTimeout(() => {
      navigate("/register");
    }, 1000);
  };

  // Declare the handleSubmit function as async
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { email, password };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/login-user",
        payload
      );
      toast.success(res.data.message); // Show success toast

      setToken(res.data.token);
      setIsSuccess(true); // Set success to true if the request is successful

      // Clear the input fields after successful login
      setEmail("");
      setPassword("");

      // Set a timeout of 3 seconds before navigating to the landing page
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred"); // Show error toast
      setIsSuccess(false);
      // Clear the input fields after failed login
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h1 className="text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          <div className="text-center">
            <span>New User?</span>
            <button
              className="btn btn-link d-inline p-0"
              onClick={goToRegister}
            >
              Register
            </button>
          </div>
        </form>
        {/* ToastContainer added here */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
