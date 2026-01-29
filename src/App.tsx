import './App.css';
import HomePage from './pages/Home/HomePage';
import SearchResultsPage from './pages/SearchResults/SearchResultsPage';
import RoomDetailsPage from './pages/RoomDetails/RoomDetailsPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/rooms/:id" element={<RoomDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
