import React, { useState, useEffect } from 'react';
import Games from './Games';
import './App.css';
import { ReactComponent as FilterIcon } from './filter.svg';

function App() {
  const [searchShown, setSearchShow] = useState(true); // used to show / hide the search menu
  return (
    <div className="App">
      <div className="header">
        <h1>SAPIENT GAMES ARENA</h1>
        <FilterIcon
          className="header--filter-icon"
          onClick={() => setSearchShow(!searchShown)}
        />
      </div>
      <Games searchShown={searchShown} />
    </div>
  );
}

export default App;
