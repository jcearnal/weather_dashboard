import React from 'react';
import { Link } from 'react-router-dom';

const HomeComponent = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="bg-white-500 text-black text-center p-12">      
                <img src="/logo.png" alt="Weather Dashboard Logo" className="mx-auto" style={{ width: '300px' }} />          
                <h1 className="text-4xl font-bold mt-4">Open Weather Dashboard</h1>
                <p className="text-xl mt-2">A free and open source weather companion.</p>
            </div>

            {/* Content Section */}
            <div className="container bg-green-50 text-black mx-auto mt-8 p-4 rounded-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
                <h2 className="text-2xl font-bold">Features</h2>
                <ul className="list-disc list-inside">
                    <li>Real-time weather updates</li>
                    <li>Search functionality to check weather anywhere in the world</li>
                    <li>Ability to save your favorite locations for quick access</li>
                    <li>Detailed forecasts including temperature, wind speed, humidity, and more</li>
                </ul>            
            </div>

            {/* Get Started Button */}
            <div className="mt-4 flex justify-center">
                <Link to="/weather" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Get Started
                </Link>
            </div>
        </div>
    );
};

export default HomeComponent;
