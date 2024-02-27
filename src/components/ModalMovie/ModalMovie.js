import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ModalMovie({ movie, closeModal }) {
    const [comment, setComment] = useState('');
  
    useEffect(() => {
      console.log('Comment changed:', comment);
    }, [comment]);
  
    const handleAddToFavorites = async () => {
      const serverURL = 'https://movies-library-be-server.onrender.com/addMovie';
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: movie.title,
          release_date: movie.release_date,
          poster_path: movie.poster_path,
          overview: movie.overview,
          comments: comment,
        }),
      };
  
      try {
        const response = await fetch(serverURL, requestOptions);
        const data = await response.json();
  
        console.log('Server response:', data);
        closeModal();
      } catch (error) {
        console.error('Error adding to favorites:', error);
      }
    };
  
    return (
      <Modal show={true} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add to Favorites</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>{movie.title}</h5>
          <img src={movie.poster_path} alt={movie.title} className="img-fluid mb-3" />
          <Form.Group controlId="comment">
            <Form.Label>Add a Comment:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddToFavorites}>
            Add to Favorites
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  export default ModalMovie;
