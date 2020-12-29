import React from 'react';

import './index.less';

const HideAndSeek2020 = () => {
  return (
    <div className="HideAndSeek2020">
      <p>
        These were the final rankings in the Hide and Seek 2020 AI competition
      </p>
      <p>Congratulations to the top 3 competitors!</p>
      <p>
        <span role="img" aria-label="1st">
          🥇
        </span>{' '}
        Joe Cai - Checkout the{' '}
        <a
          href="https://medium.com/acmucsd/how-to-hide-from-ai-the-winner-interview-82a59aed5b0b"
          target="_blank"
          rel="noopener noreferrer"
        >
          winner interview!
        </a>
      </p>
      <p>
        <span role="img" aria-label="2nd">
          🥈
        </span>{' '}
        Jeff Xu - Bot code and post mortem{' '}
        <a
          href="https://github.com/Jjx003/ACM-Hide-And-Seek-Bot"
          target="_blank"
          rel="noopener noreferrer"
        >
          top ten anime betrayals
        </a>
      </p>
      <p>
        <span role="img" aria-label="3rd">
          🥉
        </span>{' '}
        Kevin He - Bot code and post mortem{' '}
        <a
          href="https://github.com/kevin-he-01/hide-and-seek-bot"
          target="_blank"
          rel="noopener noreferrer"
        >
          clairvoyant
        </a>
      </p>
    </div>
  );
};

export default HideAndSeek2020;
