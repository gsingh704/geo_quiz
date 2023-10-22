import React from 'react';
import { Icon } from '@iconify/react';

const GameHeader = ({ score, fail, resetGame }) => {
  return (
    <div className="game-header">
      <button className="back-button" onClick={() => window.history.back()}>
        <Icon icon="mdi:arrow-left" />
      </button>
      <div className="scoreboard">
        <div className="score-box score">
          <Icon icon="mdi:check" />
          <span className="score-value">{score}</span>
        </div>
        <div className="score-box fail">
          <Icon icon="mdi:close" />
          <span className="score-value">{fail}</span>
        </div>
        <div className="score-box total">
          <Icon icon="mdi:seesaw" />
          <span className="score-value">{score + fail}</span>
        </div>
      </div>
      <button className="reset-button" onClick={resetGame}>
        <Icon icon="mdi:reload" />
      </button>
    </div>
  );
};

export default GameHeader;
