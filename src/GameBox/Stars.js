import React from 'react';

import { ReactComponent as StarOutlined } from './star-regular.svg';
import { ReactComponent as StarHalf } from './star-half-alt-solid.svg';
import { ReactComponent as StarFilled } from './star-solid.svg';
export default function Stars({ score }) {
  let filledStarsCount = parseInt(score);
  let halfStarCount = parseInt(score) === score ? 0 : 1;

  let stars = [
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
    'empty',
  ];

  for (let i = 0; i < filledStarsCount; i++) {
    stars[i] = 'filled';
  }

  if (halfStarCount) {
    stars[filledStarsCount] = 'half';
  }
  return (
    <div className="gamebox--stars">
      {stars.map((star, i) => {
        if (star === 'filled') {
          return <StarFilled className="gamebox--star gamebox--star-coloured" key={i} />;
        } else if (star === 'half') {
          return <StarHalf className="gamebox--star gamebox--star-coloured" key={i} />;
        }
        return <StarOutlined className="gamebox--star" key={i} />;
      })}
    </div>
  );
}
