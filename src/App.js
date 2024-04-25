import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import { FavoritesProvider } from './context/FavoritesContext'; 
import Header from './components/Header';
import Footer from './components/Footer';
import HomeComponent from './components/HomeComponent';
import ProtectedWeatherDisplay from './components/ProtectedWeatherDisplay';
import GoogleSignInComponent from './components/GoogleSignInComponent';

function App() {
    return (
        <Router>
            <AuthProvider> 
                <FavoritesProvider> 
                    <Header />
                    <div className="min-h-screen">
                        <Routes>
                            <Route path="/weather" element={<ProtectedWeatherDisplay />} />
                            <Route path="/signin" element={<GoogleSignInComponent />} />
                            <Route path="/" element={<HomeComponent />} />
                        </Routes>
                    </div>
                    <Footer />
                </FavoritesProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
