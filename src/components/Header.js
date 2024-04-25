import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from '../utils/authService'; 

const Header = () => {
    const { currentUser } = useAuth();

    const handleLogout = async () => {
        try {
            await signOut();
            console.log('You have been logged out.');
        } catch (error) {
            console.error('Failed to log out:', error);
        }
    };

    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-lg font-bold">Weather Dashboard</Link>
                <div>
                    {currentUser ? (
                        <>
                            <Link to="/weather" className="mr-4">Weather</Link>
                            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link to="/signin" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign In</Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
