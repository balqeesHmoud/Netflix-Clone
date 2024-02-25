
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';

function App() {
  return (
    <>
    <Home/>
    <Routes>
    <Route path="/trending" element={<Home />} />
          {/* <Route path="/favorites" element={<FavList />} /> */}
    </Routes>
     
    </>
  );
}

export default App;
