import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getMoviesData, updateLimit } from '../features/movies/movieSlice'
import { useSelector, useDispatch } from 'react-redux'
 const api_domain = import.meta.env.VITE_API_DOMAIN;
const MovieCard = (props) => {

    const dispatch = useDispatch()

    const [show, setShow] = useState(false)
    const [rating, setRating] = useState(props.movie.ratings)
    const handleShow = () => {
        setShow(true)
    }
    const handleClose = () => {
        setShow(false)
    }


    const submitRating = () => {
        const token = localStorage.getItem("access_token")
        const header = {
            "Authorization": `Bearer ${token}`
        }
        axios.put(`${api_domain}/movies-rating`, {newRating: rating, id: props.movie._id}, {
            headers: header
        })
        .then(res => {
            console.log(res.data)
            axios(`${api_domain}/movies-list`)
            .then((res) => {
                dispatch(getMoviesData(res.data))
                handleClose()
            })
            .catch((err) => {
                console.log(err)
            })
        })
    }

    const ratingChangeHandler = (event) => {
        setRating(event.target.value)
    }

    const deleteMovie = () => {
        axios.delete(`${api_domain}/movies-delete?id=${props.movie._id}`)

        .then(res => {
            console.log(res.data)
            axios.get(`${api_domain}/movies-list`)
            .then((res) => {
                dispatch(getMoviesData(res.data))
            })
            .catch((err) => {
                console.log(err)
            })
        })
    }

 return (
  <>
    <Card className="shadow-sm mb-4" style={{ borderRadius: "12px" }}>
      <Card.Img
        variant="top"
        src={props.movie.movieImage}
        style={{ height: "250px", objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
      />
      <Card.Body>
        <Card.Title className="mb-2">
          <Link
            to={`/movie-details/${props.movie.id}`}
            style={{ textDecoration: "none", color: "#0d6efd" }}
          >
            {props.movie.movieTitle}
          </Link>
        </Card.Title>

        <Card.Text className="mb-3">
          <span style={{ fontWeight: "bold", fontSize: "1.1rem" }}>
            ⭐ {props.movie.ratings}
          </span>
        </Card.Text>

        {/* Show ID in small muted text */}
        {/* <p className="text-muted" style={{ fontSize: "0.85rem" }}>
          {props.movie._id}
        </p> */}

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

    {/* Modal */}
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
      <Modal.Header closeButton>
        <div style={{ flex: 1, textAlign: "center" }}>
          <img
            src={props.movie.movieImage}
            alt={props.movie.movieTitle}
            style={{ height: "250px", width: "100%", objectFit: "contain", borderRadius: "8px" }}
          />
          <Modal.Title className="mt-3">{props.movie.movieTitle}</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <p>{props.movie.description}</p>
        <div className="mt-3 text-center">
          <label className="fw-bold me-2">Update Rating:</label>
          <input
            type="number"
            max={5}
            min={1}
            value={rating}
            onChange={ratingChangeHandler}
            className="form-control d-inline-block"
            style={{ width: "80px", textAlign: "center", fontWeight: "bold" }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Update Rating</Button>
      </Modal.Footer>
    </Modal>
  </>
);

}

export default MovieCard