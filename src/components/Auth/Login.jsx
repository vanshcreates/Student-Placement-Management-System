import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("helo guys! form submitted");
    setEmail("")
    setPassword("")
  };
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center h-220 w-200 green-bg-container">
        <h1 className="text-5xl font-bold _login">CamCaRR</h1>
        <spam className="_login">
          Student Placement Management System for a college Training & Placement
          Cell (TPO).
        </spam>
      </div>
      <div className="flex items-center border-2 h-220 w-200 justify-center">
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          action=""
          className="flex flex-col items-center gap-10"
        >
          <h2 className="text-2xl font-bold ">Login Page</h2>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className="w-100 p-2"
            type="email"
            placeholder="Enter your email"
          />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            className="w-100 p-2"
            type="password"
            placeholder="Enter your password"
          />
          <button className="w-60 p-2 green-bg-container text-white">
            Login
          </button>
          <a className="text-gray-600" href="">
            Sign Up
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
