import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherDisplay from './components/WeatherDisplay';
import LoginComponent from './components/LoginComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/" element={<WeatherDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
