import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  const gotoLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { username, email, password, role };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/register-user",
        payload
      );
      toast.success(res.data.message); // Show success toast
      setIsSuccess(true);

      // Clear input fields after success
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("");

      // Navigate to login after 1 second
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred"); // Show error toast
      setIsSuccess(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px" }}>
        <h1 className="text-center mb-4">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
              placeholder="Enter your Name"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="role"
              id="role"
              className="form-control"
              placeholder="Enter user role"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
          <div className="text-center mt-3">
            <span>Already have an account?</span>
            <button
              className="btn btn-link d-inline p-0"
              type="button"
              onClick={gotoLogin}
            >
              Login
            </button>
          </div>
        </form>

        {/* ToastContainer added here */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;
