import React, { useState, useEffect } from 'react';
import PlatformTag from './PlatformTag';
export default function Search(props) {
  const [chosesenPlatforms, setChosenplatforms] = useState([]);

  function togglePlatform(p) {
    const idx = chosesenPlatforms.indexOf(p);
    if (idx === -1) {
      setChosenplatforms([...chosesenPlatforms, p]);
    } else {
      // TODO remove item
    }
  }
  return (
    <>
      {props.platforms.map((platform) => (
        <div
          className="platform-tag"
          onClick={() => togglePlatform(platform)}
          key={platform}
        >
          {platform}
        </div>
      ))}
    </>
  );
}
