import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { useSelector, useDispatch } from "react-redux";
import { getMoviesData } from "../features/movies/movieSlice";

const api_domain = import.meta.env.VITE_API_DOMAIN;

const Homepage = () => {
  const movies = useSelector((state) => state.movies.value);
  console.log(movies);
  const [newMovie, setNewMovie] = useState({
    movieTitle: "",
    ratings: "",
    image: "",
  });

  const dispatch = useDispatch();

  function getMovies() {
    console.log("Fetching movies...");
    axios(`${api_domain}/movies-list`)
      .then((res) => {
        dispatch(getMoviesData(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getMovies();
  }, []);

  const movieInputChangeHandler = (event) => {
    let tempNewMovie = { ...newMovie };
    tempNewMovie[event.target.name] = event.target.value;
    setNewMovie(tempNewMovie);
  };

  const addMovie = (event) => {
    event.preventDefault();

    axios
      .post(`${api_domain}/movies-create`, newMovie)
      .then((res) => {
        console.log(res.data);
        getMovies();
        setNewMovie({ movieTitle: "", ratings: "", image: "" }); // clear inputs
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Add Movie Form */}
      <form
        onSubmit={addMovie}
        className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-1 rounded-xl shadow-lg mb-10"
      >
        <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
            🎬 Add a New Movie
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="movieTitle"
              onChange={movieInputChangeHandler}
              id="movieTitle"
              placeholder="Movie Title"
              value={newMovie.movieTitle}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
            <input
              type="number"
              name="ratings"
              onChange={movieInputChangeHandler}
              id="ratings"
              placeholder="Ratings (max 5)"
              max={5}
              value={newMovie.ratings}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
            <input
              type="text"
              name="image"
              onChange={movieInputChangeHandler}
              id="image"
              placeholder="Image URL"
              value={newMovie.image}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
          </div>
          <div className="mt-6 text-right">
            <button
              type="submit"
              className="px-6 py-2 bg-pink-600 text-white font-semibold rounded-lg shadow hover:bg-pink-700 transition"
            >
              ➕ Add Movie
            </button>
          </div>
        </div>
      </form>

      {/* Movies List */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
        🎥 Movies List
      </h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <MovieCard movie={movie} indexValue={index} key={movie._id || index} />
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
