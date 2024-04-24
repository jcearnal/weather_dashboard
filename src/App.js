import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedWeatherDisplay from './components/ProtectedWeatherDisplay';
import HomeComponent from './components/HomeComponent';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/weather" element={<ProtectedWeatherDisplay />} />
        <Route path="/" element={<HomeComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
