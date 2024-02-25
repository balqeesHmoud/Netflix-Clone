import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ModalMovie from '../ModalMovie/ModalMovie'; // Adjust the import based on your project structure

function Movie({ movie, openModal }) {
  return (
    <Col key={movie.ID}>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={movie.image} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.overview}</Card.Text>
          <Button variant="primary" onClick={() => openModal(movie)}>
            Add to Fav
          </Button>
        </Card.Body>
      </Card>
      {movie.selectedMovie && (
        <ModalMovie movie={movie.selectedMovie} closeModal={movie.closeModal} />
      )}
    </Col>
  );
}

export default Movie;
