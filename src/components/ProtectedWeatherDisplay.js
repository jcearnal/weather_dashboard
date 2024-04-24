import React from 'react';
import { useAuth } from '../context/AuthContext';
import WeatherDisplay from './WeatherDisplay'; 
import GoogleSignInComponent from './GoogleSignInComponent';

const ProtectedWeatherDisplay = () => {
    const { currentUser } = useAuth();

    // Check if user is signed in
    if (!currentUser) {
        // If not signed in, show the GoogleSignInComponent
        return <GoogleSignInComponent />;
    }

    // If signed in, show the WeatherDisplay component
    return <WeatherDisplay />;
};

export default ProtectedWeatherDisplay;
