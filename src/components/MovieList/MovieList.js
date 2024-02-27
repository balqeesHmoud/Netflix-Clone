import React, { useEffect, useState } from 'react';
import Movie from '../Movie/Movie';
import ModalMovie from '../ModalMovie/ModalMovie';
import Row from 'react-bootstrap/Row';


function MovieList() {
  const [moviesArr, setMoviesArr] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const sendReq = async () => {
    const serverURL = 'https://movies-library-be-server.onrender.com/trending';
    const res = await fetch(serverURL);
    const jsonRes = await res.json();
    setMoviesArr(jsonRes);
  }

  useEffect(() => {
    sendReq();
  }, []);

  const openModal = (movie) => {
    setSelectedMovie(movie);
  }

  const closeModal = () => {
    setSelectedMovie(null);
  }

  return (
    <Row xs={1} md={4} className="g-4">
      {moviesArr.map((item) => (
        <Movie key={item.ID} movie={item} openModal={openModal} />
      ))}
      {selectedMovie && (
        <ModalMovie movie={selectedMovie} closeModal={closeModal} />
      )}
    </Row>
  );
}

export default MovieList;
