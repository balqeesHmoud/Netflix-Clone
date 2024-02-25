import React, { useEffect ,useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ModalMovie({ movie, closeModal }) {
    const [comment, setComment] = useState('');

    useEffect(() => {
        // This effect will run when the component mounts or when 'comment' changes
        console.log('Comment changed:', comment);
    }, [comment]);

    const handleAddToFavorites = async () => {
        console.log('Adding to favorites:', movie, 'with comment:', comment);

        // Perform the data-saving logic here
        const serverURL = 'http://localhost:3007/addMovie';
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: movie.title,
                release_date: movie.releaseDate,
                poster_path: movie.posterPath,
                overview: movie.overview,
                comments: comment,
            }),
        };

        try {
            const response = await fetch(serverURL, requestOptions);
            const data = await response.json();

            // Log the response from the server
            console.log('Server response:', data);

            // Close the modal after handling the add to favorites action
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
                <img src={`https://image.tmdb.org/t/p/w500/${movie.posterPath}`} alt={movie.title} style={{ maxWidth: '100%' }} />
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
