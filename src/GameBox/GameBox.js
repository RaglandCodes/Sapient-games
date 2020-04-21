// Presentation component
import React from 'react';
import Stars from './Stars';
export default function GameBox({ game }) {
  return (
    <div className="gameBox">
      <div className="gameBox--title">{game.title}</div>
      <div className="gameBox--row2">
        <span className="gamebox--platform">{game.platform}</span>
        <div className="flex-one"></div>
        <span className="gamebox--year">{game.release_year}</span>
      </div>
      {/* <div className="gameBox--score">{game.score}</div> */}
      <Stars score={game.score} />
    </div>
  );
}
