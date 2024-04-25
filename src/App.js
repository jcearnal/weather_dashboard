import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Provides user authentication context
import { FavoritesProvider } from './context/FavoritesContext'; // Provides favorites context
import Header from './components/Header'; // Displays the top navigation bar
import Footer from './components/Footer'; // Displays the footer
import HomeComponent from './components/HomeComponent'; // Landing page component
import ProtectedWeatherDisplay from './components/ProtectedWeatherDisplay'; // Weather display requiring authentication
import GoogleSignInComponent from './components/GoogleSignInComponent'; // Google sign-in component

function App() {
    return (
        <Router> {/* React Router for handling routing */}
            <AuthProvider> {/* Context provider for auth state */}
                <FavoritesProvider> {/* Context provider for managing favorites */}
                    <Header /> {/* Site header */}
                    <div className="min-h-screen">
                        <Routes> {/* Route management for navigation */}
                            <Route path="/weather" element={<ProtectedWeatherDisplay />} /> {/* Protected route for weather display */}
                            <Route path="/signin" element={<GoogleSignInComponent />} /> {/* Route for Google sign-in */}
                            <Route path="/" element={<HomeComponent />} /> {/* Default route to home page */}
                        </Routes>
                    </div>
                    <Footer /> {/* Site footer */}
                </FavoritesProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
