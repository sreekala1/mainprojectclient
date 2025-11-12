import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Ratings = () => {
    const [movies, setMovies] = useState([
        {
            id: 2,
            title: "Mens Casual Premium Slim Fit T-Shirts",
            image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
            description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
            ratings: 4,
            review: "Good movie"
        }
    ])
  return (
    <>
    <ul>
        {movies.map((movie) => {
            return (
                <li>
                    <div className='d-flex justify-content-between align-items-center'>
                        <img src = {movie.image} style = {{height: "50px", width: "50px", objectFit: "contain"}} />
                        <Link to = {"/movie-details/"+movie.id}>{movie.title}</Link>
                        <p>Rating: {movie.ratings}</p>
                        <p>Review: {movie.review}</p>
                    </div>
                    <hr />
                </li>
            )
        })}
    </ul>
    </>
  )
}

export default Ratings