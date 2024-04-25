import React from 'react';

const SearchComponent = ({ onSearch, locationQuery, setLocationQuery, onUseCurrentLocation }) => {
    // Handle form submission, prevent default behavior, and trim input
    const handleFormSubmit = (e) => {
      e.preventDefault(); 
      onSearch(locationQuery.trim()); // Triggers search function with cleaned query
    };

    return (
    <div className="text-center my-4">
        <form onSubmit={handleFormSubmit}>
          <div className="mb-2">
            {/* Input field for location query */}
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="Enter City, State, Country"
              className="border-2 border-gray-300 p-2 rounded w-full"
            />
          </div>
          <div className="mb-2">
            {/* Search button */}
            <button
              type="submit" 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-auto w-1/2 max-w-xs"
            >
              Search
            </button>
          </div>
        </form>
        <div>
            {/* Button to use current location */}
          <button
            onClick={onUseCurrentLocation}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-auto w-1/2 max-w-xs"
          >
            Use My Location
          </button>
        </div>
      </div>
    );
};

export default SearchComponent;
