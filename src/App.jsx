import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './css/App.css';
import Flag from './Games/Flag';
import Capital from './Games/Capital';
import Population from './Games/Population';
import CoatsArms from './Games/CoatsArms';
import { Icon } from '@iconify/react';


export default function App() {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Which Game do you want to play?</h1>
              <div className="game-options">
                <button className="game-button flag-button" onClick={() => handleButtonClick('/flag')}>
                  <Icon icon="mdi:flag" /> Guess the Flag
                </button>
                <button className="game-button capital-button" onClick={() => handleButtonClick('/capital')}>
                  <Icon icon="mdi:world" /> Guess the Capital
                </button>
                <button className="game-button population-button" onClick={() => handleButtonClick('/population')}>
                  <Icon icon="mdi:account-group" /> Bigger Population
                </button>
                <button className="game-button todo-button" onClick={() => handleButtonClick('/coatsarms')}>
                  <Icon icon="mdi:cards-spade" /> Guess the Coat of Arms
                </button>
              </div>
            </>
          }
        />
        <Route path="/flag" element={<Flag />} />
        <Route path="/capital" element={<Capital />} />
        <Route path="/population" element={<Population />} />
        <Route path="/coatsarms" element={<CoatsArms />} />
      </Routes>
    </div>
  );
}
