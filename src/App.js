
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import FavList from './components/FavList/FavList';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
    <Route path="/trending" element={<Home/>} />
    <Route path="/" element={<Home/>} />
    <Route path="/favorites" element={<FavList/>} />
    </Routes>
     
    </>
  );
}

export default App;
