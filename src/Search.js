import React, { useState, useEffect } from 'react';
export default function Search(props) {
  const [chosesenPlatforms, setChosenplatforms] = useState([]);

  function togglePlatform(p) {
    const idx = chosesenPlatforms.indexOf(p);
    if (idx === -1) {
      setChosenplatforms([...chosesenPlatforms, p]);
    } else {
      setChosenplatforms(chosesenPlatforms.filter((platform) => platform !== p));
    }
  }

  useEffect(() => {
    console.dir(chosesenPlatforms);
    console.log('^chosesenPlatforms');
  }, [chosesenPlatforms]);
  return (
    <>
      <form id="game-search-form">
        <label htmlFor="search-field" id="search-label">
          {' '}
          Search for games
        </label>
        <input type="text" id="search-field" />
      </form>
      <div className="platform-tags">
        {props.platforms.map((platform) => {
          const exists = chosesenPlatforms.indexOf(platform) !== -1;
          const classes = `platform-tag ${exists ? 'chosen-platform-tag' : ''}`;

          console.log(`${classes} <== classes`);
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
    </>
  );
}
