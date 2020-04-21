import React, { useState, useEffect } from 'react';
import GameBox from './GameBox/GameBox';
import Search from './Search';

export default function Games(props) {
  const [games, setGames] = useState([]); // this has all the games
  const [gamesToShow, setGamesToShow] = useState([]); // games to show to the user
  const [platforms, setPlatforms] = useState([]); // all the  available platforms
  const [message, setMessage] = useState(null);
  const [preferences, setPreferences] = useState({
    platforms: [],
    searchTerm: '',
    useCustomPreferences: false,
  });
  const updatePreferences = (newPreferences) => {
    setPreferences(newPreferences);
  };
  useEffect(() => {
    // fetch from API when component mounts
    setMessage('⏳ Loading...please wait');

    // This being http can cause some problems
    fetch('http://starlord.hackerearth.com/gamesext')
      .then((res) => res.json())
      .then((allGames) => {
        setMessage(null); // remove the loading message

        // when dubugging, use a smaller number of games to be managable
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
        setGamesToShow(uniqeGames);
      })
      .catch((err) => {
        console.log(`${err} <== err`);
        setMessage('⚠️ Somethig  went wrong. ');
      });
  }, []);

  useEffect(() => {
    // change the list of games when user's search changes
    console.log(`${JSON.stringify(preferences, null, 2)} <== preferences`);

    if (preferences.useCustomPreferences) {
      let filteredGames = games; // start with all the games, then add conditions one by one

      if (preferences.platforms.length > 0) {
        // filter by platform
        filteredGames = games.filter(
          (game) => preferences.platforms.indexOf(game.platform) !== -1
        );
        setMessage(null);
        setGamesToShow(filteredGames);
      }

      // also filter by searchterm
      if (preferences.searchTerm.length > 0) {
        filteredGames = filteredGames.filter(
          (game) =>
            game.title.toLowerCase().indexOf(preferences.searchTerm.toLowerCase()) !== -1
        );

        if (filteredGames.length === 0) {
          setMessage('Nothing was found for your preferences');
        } else {
          // clear the previous message?
          setMessage(null);
        }

        setGamesToShow(filteredGames);
      }
    } else {
      // show all games if user does NOT want filters
      setGamesToShow(games);
    }
  }, [preferences]);
  return (
    <div>
      {props.searchShown ? (
        <Search
          platforms={platforms}
          updatePreferences={updatePreferences}
          preferences={preferences}
        />
      ) : null}
      <div className="message">{message}</div>
      <div id="games-container">
        {gamesToShow.map((game) => (
          <GameBox game={{ ...game }} key={game.url} />
        ))}
      </div>
    </div>
  );
}
