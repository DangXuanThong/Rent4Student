import './App.css';
import HomePage from './pages/Home/HomePage';
import SearchResultsPage from './pages/SearchResults/SearchResultsPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
