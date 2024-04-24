import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component

const HomeComponent = () => {
  return (
    <div>
      <h1>Welcome to the Weather Dashboard</h1>
      <p>This is the home page.</p>
      <nav>
        <ul>
          <li><Link to="/weather">View Weather</Link></li> {/* Link to the weather display */}
          {/* Add other navigation links as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default HomeComponent;
