# Open Weather Dashboard

The Open Weather Dashboard is a comprehensive weather tracking application that allows users to get real-time weather updates, forecasts, and manage their favorite locations. This project serves to meet the requirements for my INF 655 Final Project. The application is deployed to Firebase at the following URL: [https://weather-dashboard-48e21.firebaseapp.com](https://weather-dashboard-48e21.firebaseapp.com).

![dash_screenshot](https://github.com/jcearnal/weather_dashboard/assets/71468973/2d2a1759-21d3-4de9-8d74-9443b47321fc)

## Features

- **Current Weather Display**: Shows real-time weather conditions including temperature, humidity, wind speed, and a daily summary.
- **7-Day Weather Forecast**: Provides a detailed forecast for the next seven days, displaying temperature highs/lows, humidity, precipitation probabilities, and wind speeds.
- **Favorite Locations**: Users can save their favorite locations for quick and easy access to weather data. This feature requires user authentication.
- **Search Functionality**: Allows users to search for weather by city, state, and country. The search requires a comma-separated input format (e.g., San Francisco, California, USA).
- **Geolocation Support**: Users can opt to use their current location to fetch weather data, with this information being retrieved directly from the browser's location capabilities.

## Technologies Used

- **ReactJS**: The app is built using React, creating a dynamic and responsive user interface.
- **Tailwind CSS**: This utility-first CSS framework is used for styling the application, ensuring a clean and modern design.
- **Firebase Realtime Database**: Used to store and retrieve user data in real-time, including the management of favorite locations.
- **Firebase Authentication**: Provides a secure authentication system, currently supporting sign-in with Google. This is required for managing favorite locations.
- **OpenWeatherMap API**: External API used to fetch current weather data and forecasts. OpenWeatherMap's GeoCoding API is used perform reverse geocoding based on location inputs.

## Project Dependencies

This project uses the following dependencies:

- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Firebase**: A platform developed by Google for creating mobile and web applications.
  - `firebase/auth`: For authentication services.
  - `firebase/database`: For real-time database services.
  - `firebase/firestore`: For cloud firestore services.
- **axios**: Promise based HTTP client for the browser and node.js.
- **react-router-dom**: DOM bindings for React Router.

## Authentication

To access personalized features such as managing favorite locations, users need to sign in using their Google accounts. This integration ensures that each user's data is securely managed and personalized.

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jcearnal/weather_dashboard.git
   cd weather_dashboard

2. **Install Dependencies:**
   ```bash
   npm install

3. **Environment Setup:**
    Ensure you have a .env file in your root directory with all necessary API keys and Firebase configuration details.   

4. **Start the development server:**    
   ```bash
   npm start

5. **Environment Setup:**
   ```bash
   npm run build

## Usage
* Accessing the Weather Data: Open the application and use the search bar to enter your desired location in the format: City, State, Country (e.g., Austin, Texas, USA). Alternatively, you can use the "Use My Location" button to automatically fetch weather data for your current location.
* Managing Favorites: While signed in, you can add or remove locations from your favorites for quicker access in future sessions.

## Contributing
Contributions to the Open Weather Dashboard are welcome. Please feel free to fork the repository, make improvements, and submit pull requests.
