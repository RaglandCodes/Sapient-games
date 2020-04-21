// Presentation component
import React, { useState, useEffect } from 'react';

export default function GameBox({ game }) {
  //   console.log(`${game.url} <== game.url`);
  //   console.dir(game);
  //   console.log('^game');
  return (
    <div className="gameBox">
      <div className="gameBox--title">{game.title}</div>
      <div className="gameBox--row2">
        <span className="gamebox--platform">{game.platform}</span>
        <div className="flex-one"></div>
        <span className="gamebox--year">{game.release_year}</span>
      </div>
      <div className="gameBox--score">{game.score}</div>
    </div>
  );
}
