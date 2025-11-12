import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserHeader = () => {
  const movies = useSelector((state) => state.movies.limit);

  return (
    <div className="navbar fixed top-0 w-full backdrop-blur-md bg-white/10 text-white shadow-lg border-b border-white/20">
      <div className="flex-1">
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-black hover:text-yellow-300 transition"
        >
          🎬 Movie Hub
        </Link>

      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-white font-medium">
          <li>
            <Link
              to="/"
              className=" hover:text-white px-4 py-2 rounded-md transition"
            >
              Movies
              <span className="badge badge-warning ml-2">{movies}</span>
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className=" hover:text-white px-4 py-2 rounded-md transition"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserHeader;
