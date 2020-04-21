import React, { useState } from 'react';
import Games from './Games';
import './App.css';
import { ReactComponent as FilterIcon } from './filter.svg';

function App() {
  const [searchShown, setSearchShow] = useState(false); // used to show / hide the search menu
  return (
    <div className="App">
      <div className="header">
        <h1>SAPIENT GAMES ARENA</h1>
        <button className="icon-button">
          <FilterIcon
            className="header--filter-icon icon-buton--icon"
            onClick={() => setSearchShow(!searchShown)}
          />
          <div className="icon-buton--label">Filter</div>
        </button>
      </div>

      <Games searchShown={searchShown} />
    </div>
  );
}

export default App;
