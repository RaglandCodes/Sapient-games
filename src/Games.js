import React, { useState, useEffect } from 'react';
import GameBox from './GameBox/GameBox';
import Search from './Search';

export default function Games({ preferences }) {
  const [games, setGames] = useState([]); // this has all the games
  const [gamesToShow, setGamesToShow] = useState([]);
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    fetch('http://starlord.hackerearth.com/gamesext')
      .then((res) => res.json())
      .then((allGames) => {
        allGames = allGames.slice(0, 97);

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

        setPlatforms([...new Set(uniqeGames.map((game) => game.platform))]);
        setGames(uniqeGames);
      })
      .catch((err) => {
        console.log(`${err} <== err`);
      });
  }, []);

  useEffect(() => {
    console.log('preferences changed');
  }, [preferences]);
  return (
    <div>
      <Search platforms={platforms} />
      {games.map((game) => (
        <GameBox game={{ ...game }} key={game.url} />
      ))}
    </div>
  );
}
