import React, { useState, useEffect } from 'react';
import GameBox from './GameBox';

import { nanoid } from 'nanoid';

export default function Games() {
  const [games, setGames] = useState([]);
  useEffect(() => {
    fetch('http://starlord.hackerearth.com/gamesext')
      .then((res) => res.json())
      .then((allGames) => {
        allGames = allGames.slice(0, 45);

        let uniqeGames = [];
        const map = new Map();
        for (const item of allGames) {
          if (!map.has(item.url)) {
            map.set(item.url, true); // set any value to Map
            uniqeGames.push({
              ...item,
            });
          }
        }
        uniqeGames = uniqeGames.slice(10);
        setGames(uniqeGames);
        // allGames = allGames.map((game) => {
        //   return {
        //     ...game,
        //     key: nanoid(5),
        //   };
        // });
      })
      .catch((err) => {
        console.log(`${err} <== err`);
      });
  }, []);
  return (
    <div>
      Games
      {games.map((game) => (
        <GameBox game={{ ...game }} key={game.url} />
      ))}
    </div>
  );
}
