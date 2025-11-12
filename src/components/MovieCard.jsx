import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getMoviesData } from "../features/movies/movieSlice";

const api_domain = import.meta.env.VITE_API_DOMAIN;

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(movie.ratings);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // ⭐ Update Rating
  const submitRating = () => {
    const token = localStorage.getItem("access_token");
    const header = { Authorization: `Bearer ${token}` };

    axios
      .put(
        `${api_domain}/movies-rating`,
        { newRating: rating, id: movie._id },
        { headers: header }
      )
      .then(() => axios.get(`${api_domain}/movies-list`))
      .then((res) => {
        dispatch(getMoviesData(res.data));
        handleClose();
      })
      .catch((err) => console.error("Update rating error:", err));
  };

  // 🎬 Delete Movie
  const deleteMovie = () => {
    axios
      .delete(`${api_domain}/movies-delete?id=${movie._id}`)
      .then(() => axios.get(`${api_domain}/movies-list`))
      .then((res) => {
        dispatch(getMoviesData(res.data));
      })
      .catch((err) => console.error("Delete movie error:", err));
  };

  return (
    <>
      {/* Movie Card */}
      <Card className="shadow-sm mb-4 border-0" style={{ borderRadius: "12px" }}>
        <Card.Img
          variant="top"
          src={movie.movieImage}
          alt={movie.movieTitle}
          style={{
            height: "250px",
            objectFit: "cover",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        />
        <Card.Body>
          <Card.Title className="mb-2">
            <Link
              to={`/movie-details/${movie.id}`}
              style={{ textDecoration: "none", color: "#0d6efd", cursor: "pointer" }}
            >
              {movie.movieTitle}
            </Link>
          </Card.Title>

          <Card.Text className="mb-3">
            <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
              ⭐ {movie.ratings}
            </span>
          </Card.Text>

          <div className="d-flex">
            <Button variant="primary" className="me-3" onClick={handleShow}>
              Edit Rating
            </Button>
            <Button variant="danger" onClick={deleteMovie}>
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Rating Modal */}
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>{movie.movieTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={movie.movieImage}
            alt={movie.movieTitle}
            style={{
              height: "220px",
              width: "100%",
              objectFit: "contain",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          />
          <p className="mb-3">{movie.description}</p>

          {/* Star Rating */}
          <div>
            <label className="fw-bold d-block mb-2">Update Rating:</label>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  style={{
                    fontSize: "2rem",
                    cursor: "pointer",
                    color: star <= rating ? "#ffc107" : "#e4e5e9",
                    transition: "color 0.2s",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submitRating}>
            Save Rating
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieCard;
