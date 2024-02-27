import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import ModalMovie from '../ModalMovie/ModalMovie';

function Movie({ movie, openModal }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3} key={movie.ID} className="mb-4">
      <Card>
        <Card.Img variant="top" src={movie.poster_path} />

        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.overview}</Card.Text>
          <Button variant="primary" onClick={() => openModal(movie)}>
            Add to Fav
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default Movie;
