import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from "react-bootstrap/Modal";

function FavList() {
    const [favArr, setFavArr] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [newComment, setNewComment] = useState('');

    const sendReq = async () => {
        const serverURL = 'https://movies-library-be-server.onrender.com/getMovies';
        const res = await fetch(serverURL);
        const data = await res.json();
        const favoriteMovies = data.filter(movie => !movie.isTrending);

        setFavArr(favoriteMovies);
    }

    useEffect(() => {
        sendReq();
    }, [])

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem(null);
        setNewComment(''); 
    }

    const handleUpdateClick = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    }

    const handleAddComment = async (item) => {
        if (!item || !item.id) {
            console.error('Invalid item or item id.');
            return;
        }

        const serverURLUpdate = `https://movies-library-be-server.onrender.com/update/${item.id}`;
        
        try {
            const res = await fetch(serverURLUpdate, {
                method: 'PATCH',  
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comments: newComment }),
            });

            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    setFavArr(data.updatedData);
                    handleCloseModal();
                } else {
                    console.error('Failed to update comment - Server response indicates failure:', data.error);
                }
            } else {
                console.error('Failed to update comment - Network error:', res.statusText);
                console.log('Full response:', await res.text());
            }
        } catch (error) {
            console.error('Failed to update comment - Unexpected error:', error);
        }
    }

    const handleDeleteClick = async (itemId) => {
        const serverURLDelete = `https://movies-library-be-server.onrender.com/delete/${itemId}`
        const res1 = await fetch(serverURLDelete, {
            method: 'DELETE',
        })
            .then((res1) => {
                if (res1.ok) {
                    const updateFavArr = favArr.filter(item => item.id !== itemId);
                    setFavArr(updateFavArr)
                }
            })
            .catch((error) => {
                console.error('Error while deleting item:', error);
            })
            .finally(() => {
                handleCloseModal();
            })
    }

    return (
        <Row xs={1} md={3} className="g-4">
            {favArr && favArr.map((item) => (
                <Col key={item.id}>
                    <Card>
                        <Card.Img variant="top" src={item.poster_path} alt={item.title} />
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Button variant="outline-primary" onClick={() => handleUpdateClick(item)}>Update</Button>
                            <Button variant="outline-danger" onClick={() => handleDeleteClick(item.id)}>Delete</Button>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
            
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    {selectedItem && <Modal.Title>{selectedItem.title}</Modal.Title>}
                </Modal.Header>
                <Modal.Body>
                    {selectedItem && (
                        <>
                            <img src={selectedItem.poster_path} alt={selectedItem.title} style={{ maxWidth: '100%' }} />
                            <p>{selectedItem.overview}</p>
                            <label>Update Comment:</label>
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="outline-primary" onClick={() => handleAddComment(selectedItem)}>
                        Update Comment
                    </Button>
                </Modal.Footer>
            </Modal>
        </Row>
    )
}

export default FavList;
