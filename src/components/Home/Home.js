// Home.js
import MovieList from '../MovieList/MovieList';

function Home() {
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Trending Movies</h1>
      <MovieList />
    </div>
  );
}

export default Home;
