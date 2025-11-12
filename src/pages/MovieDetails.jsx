import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserHeader from "../components/UserHeader";

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const params = useParams();
  const movieID = params.id;

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/" + movieID) // replace with your movies API if needed
      .then((res) => {
        setMovie(res.data);
      });
  }, [movieID]);

  return (
    <>
      <UserHeader />
      <div className="max-w-6xl mx-auto p-6">
        {movie?.title ? (
          <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row">
            {/* Movie Image */}
            <div className="md:w-1/2">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-96 object-contain bg-gray-100 p-4"
              />
            </div>

            {/* Movie Details */}
            <div className="md:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {movie.title}
                </h1>
                <p className="text-gray-600 mb-4">{movie.description}</p>

                <p className="text-lg font-semibold text-indigo-600 mb-2">
                  Rating: ⭐ {movie.rating?.rate || "N/A"} / 5
                </p>
                <p className="text-lg font-bold text-green-600 mb-4">
                  Price: ${movie.price}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex space-x-4 mt-6">
                <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
                  Add to Favorites
                </button>
                <button className="px-5 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition">
                  Back to Movies
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">Loading movie details...</p>
        )}
      </div>
    </>
  );
};

export default MovieDetails;
