import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const api_domain = import.meta.env.VITE_API_DOMAIN;
const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

  const registerHandler = (event) => {
    event.preventDefault();

    if (userData.password !== userData.cpassword) {
      alert("Passwords do not match!");
      return;
    }

    axios
      .post(`${api_domain}/user/register`, {
        email: userData.email,
        password: userData.password,
      })
      .then((res) => {
        alert(res.data.message);
        navigate("/login");
      })
      .catch((err) => {
        alert(err.response?.data?.message || "Registration failed");
        console.log(err);
      });
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
      <form
        onSubmit={registerHandler}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <input
          type="email"
          placeholder="Email ID"
          name="email"
          value={userData.email}
          onChange={changeHandler}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={userData.password}
          onChange={changeHandler}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          name="cpassword"
          value={userData.cpassword}
          onChange={changeHandler}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition"
        >
          Register
        </button>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
