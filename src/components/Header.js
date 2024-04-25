import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // Import context to use the authentication status
import { signOut } from '../utils/authService';  // Import sign out function from auth service

const Header = () => {
    const { currentUser } = useAuth();  // Access the current user from AuthContext

    // Function to handle user logout
    const handleLogout = async () => {
        try {
            await signOut();  // Attempt to sign out user
            console.log('You have been logged out.');  // Log successful logout
        } catch (error) {
            console.error('Failed to log out:', error);  // Log any errors during logout
        }
    };

    // Render header with navigation
    return (
        <header className="bg-gray-800 text-white p-4">
            <nav className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-lg font-bold">Home</Link> 
                <div>
                    {currentUser ? (  // Conditional rendering based on user authentication
                        <>
                            <Link to="/weather" className="mr-4">Weather</Link>  
                            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Logout
                            </button>  
                        </>
                    ) : (
                        <Link to="/weather" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign In</Link>  
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;
