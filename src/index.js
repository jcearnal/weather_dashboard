import React from 'react';
import { createRoot } from 'react-dom/client'; 
import App from './App';
import { AuthProvider } from './context/AuthContext'; 
import './index.css';

// Use document.getElementById to find the root element
const container = document.getElementById('root');
// Create a root container from the element
const root = createRoot(container); 

// Render the App within the AuthProvider and React.StrictMode
root.render(
  <React.StrictMode>
    <AuthProvider>  
      <App />
    </AuthProvider>
  </React.StrictMode>
);
