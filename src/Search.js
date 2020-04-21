import React, { useState, useEffect } from 'react';
export default function Search(props) {
  const [chosesenPlatforms, setChosenplatforms] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e) => {
    // called when user submits the search form
    e.preventDefault();
    props.updatePreferences({
      ...props.preferences,
      searchTerm: searchInput,
      useCustomPreferences: true,
    });
  };

  const clearAllFilters = () => {
    setChosenplatforms([]);
    props.updatePreferences({
      platforms: [],
      searchTerm: '',
      useCustomPreferences: false,
    });
  };
  function togglePlatform(p) {
    const idx = chosesenPlatforms.indexOf(p);
    if (idx === -1) {
      setChosenplatforms([...chosesenPlatforms, p]);
    } else {
      setChosenplatforms(chosesenPlatforms.filter((platform) => platform !== p));
    }
  }

  useEffect(() => {
    console.log(`${JSON.stringify(chosesenPlatforms, null, 2)} <== chosesenPlatforms`);
    props.updatePreferences({
      ...props.preferences,
      platforms: [...chosesenPlatforms],
      useCustomPreferences: chosesenPlatforms.length ? true : false, // don't show empty list when nothing is chosen
    });
  }, [chosesenPlatforms]);
  return (
    <div className="search-container">
      <h2>Filter Games</h2>
      <h3>Search for games</h3>

      <form id="game-search-form" onSubmit={handleSearchSubmit}>
        <label htmlFor="search-field" id="search-label">
          Search for games
        </label>
        <br />
        <div className="form--text-btn-wrap">
          <input
            type="text"
            id="search-field"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <input type="submit" />
        </div>
      </form>
      <h3>Filter by platform</h3>
      <div className="platform-tags">
        {props.platforms.map((platform) => {
          const exists = chosesenPlatforms.indexOf(platform) !== -1;
          const classes = `platform-tag ${exists ? 'chosen-platform-tag' : ''}`;
          return (
            <div
              className={classes}
              onClick={() => togglePlatform(platform)}
              key={platform}
            >
              {platform}
            </div>
          );
        })}
      </div>
      <button onClick={() => clearAllFilters()}> Clear all filters</button>
    </div>
  );
}
