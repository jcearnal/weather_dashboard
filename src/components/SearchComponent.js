import React from 'react';

const SearchComponent = ({ onSearch, locationQuery, setLocationQuery }) => {
  return (
    <div className="text-center my-4">
      <input
        type="text"
        value={locationQuery}
        onChange={(e) => setLocationQuery(e.target.value)}
        placeholder="Enter City, State, Country"
        className="border-2 border-gray-300 p-2 rounded"
      />
      <button onClick={() => onSearch(locationQuery)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go
      </button>
    </div>
  );
};

export default SearchComponent;
