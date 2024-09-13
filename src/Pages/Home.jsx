// src/pages/Home.js
import React from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import Navbar from "../Components/Navbar";

const Home = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle button click and navigate to the register page
  const goToRegister = () => {
    navigate("/register");
  };
  const gotoLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <Navbar />
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 shadow" style={{ width: "400px" }}>
          <h1 className="text-center mb-4">
            Welcome to the{" "}
            <strong className="text-primary">JWT</strong>
            <strong className="text-danger"> Authentication!</strong>
          </h1>

          <div className="d-flex justify-content-center align-items-center ">
            <button onClick={goToRegister} className="btn btn-primary">
              Register
            </button>
          </div>
          <p className="text-center">
            already user?{" "}
            <button onClick={gotoLogin} className="btn btn-link ll">
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
