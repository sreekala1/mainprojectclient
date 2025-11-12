import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const api_domain = import.meta.env.VITE_API_DOMAIN;
const Login = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const loginHandler = (event) => {
    event.preventDefault();
    axios
      .post(`${api_domain}/user/login`, {
        email: userData.email,
        password: userData.password,
      })
      .then((res) => {
        alert(res.data.message);
        localStorage.setItem("access_token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        console.log("Error");
        alert(err.response?.data || "Login failed");
      });
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <form
        onSubmit={loginHandler}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email ID"
          name="email"
          value={userData.email}
          onChange={changeHandler}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={userData.password}
          onChange={changeHandler}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Login
        </button>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
