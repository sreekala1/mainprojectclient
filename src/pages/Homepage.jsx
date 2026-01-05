import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { useSelector, useDispatch } from "react-redux";
import { getMoviesData } from "../features/movies/movieSlice";

const api_domain = import.meta.env.VITE_API_DOMAIN;

const Homepage = () => {
  const movies = useSelector((state) => state.movies.value);
  const dispatch = useDispatch();

  const [newMovie, setNewMovie] = useState({
    movieTitle: "",
    ratings: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  /* ---------------- Fetch Movies ---------------- */
  const getMovies = () => {
    axios(`${api_domain}/movies-list`)
      .then((res) => dispatch(getMoviesData(res.data)))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMovies();
  }, []);

  /* ---------------- Input Handler ---------------- */
  const movieInputChangeHandler = (e) => {
    setNewMovie({ ...newMovie, [e.target.name]: e.target.value });

    // Clear error while typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  /* ---------------- Validation ---------------- */
  const validateForm = () => {
    let tempErrors = {};

    if (!newMovie.movieTitle.trim()) {
      tempErrors.movieTitle = "Movie title is required";
    } else if (newMovie.movieTitle.length < 2) {
      tempErrors.movieTitle = "Movie title must be at least 2 characters";
    }

    if (!newMovie.ratings) {
      tempErrors.ratings = "Ratings is required";
    } else if (newMovie.ratings < 0 || newMovie.ratings > 5) {
      tempErrors.ratings = "Ratings must be between 0 and 5";
    }

    if (!newMovie.image.trim()) {
      tempErrors.image = "Image URL is required";
    } else {
      try {
        new URL(newMovie.image);
      } catch {
        tempErrors.image = "Enter a valid image URL";
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  /* ---------------- Add Movie ---------------- */
  const addMovie = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    axios
      .post(`${api_domain}/movies-create`, newMovie)
      .then(() => {
        getMovies();
        setNewMovie({ movieTitle: "", ratings: "", image: "" });
        setErrors({});
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* ---------------- Add Movie Form ---------------- */}
      <form
        onSubmit={addMovie}
        className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-1 rounded-xl shadow-lg mb-10"
      >
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
            🎬 Add a New Movie
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Movie Title */}
            <div>
              <input
                type="text"
                name="movieTitle"
                placeholder="Movie Title"
                value={newMovie.movieTitle}
                onChange={movieInputChangeHandler}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.movieTitle && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.movieTitle}
                </p>
              )}
            </div>

            {/* Ratings */}
            <div>
              <input
                type="number"
                name="ratings"
                placeholder="Ratings (0–5)"
                min={0}
                max={5}
                value={newMovie.ratings}
                onChange={movieInputChangeHandler}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.ratings && (
                <p className="text-red-500 text-sm mt-1">{errors.ratings}</p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={newMovie.image}
                onChange={movieInputChangeHandler}
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">{errors.image}</p>
              )}
            </div>
          </div>

          <div className="mt-6 text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition"
            >
              ➕ Add Movie
            </button>
          </div>
        </div>
      </form>

      {/* ---------------- Movies List ---------------- */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        🎥 Movies List
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <MovieCard
              movie={movie}
              indexValue={index}
              key={movie._id || index}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-16 bg-gray-100 dark:bg-gray-800 rounded-lg shadow">
            <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              🚫 No movies for review are available.
            </p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Try adding a new one above 🎬
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
