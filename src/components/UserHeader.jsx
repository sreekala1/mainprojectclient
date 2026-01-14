import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const UserHeader = () => {
  const movies = useSelector((state) => state.movies.limit);

  const isLoggedIn = localStorage.getItem("access_token");
  const logoutHandler = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login"; // refresh page after logout
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          <Link
            to="/"
            className="text-2xl font-bold tracking-wide hover:text-yellow-400 transition"
          >
            🎬 Movie Hub
          </Link>

          <nav>
            <ul className="flex items-center space-x-6 font-medium">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `hover:text-yellow-400 ${
                      isActive ? "text-yellow-400" : ""
                    }`
                  }
                >
                  Movies
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `hover:text-yellow-400 ${
                      isActive ? "text-yellow-400" : ""
                    }`
                  }
                >
                  Contact Us
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/career"
                  className={({ isActive }) =>
                    `hover:text-yellow-400 ${
                      isActive ? "text-yellow-400" : ""
                    }`
                  }
                >
                  Careers
                </NavLink>
              </li>

              {/* ---------- LOGIN / LOGOUT BUTTON ---------- */}
              <li>
                {isLoggedIn ? (
                  <button
                    onClick={logoutHandler}
                    className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                ) : (
                  <NavLink
                    to="/login"
                    className="bg-yellow-400 text-black px-4 py-1.5 rounded-md hover:bg-yellow-500 transition"
                  >
                    Login
                  </NavLink>
                )}
              </li>
              {/* ------------------------------------------- */}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
