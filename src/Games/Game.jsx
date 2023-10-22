import React, { useEffect, useState } from 'react';
import '../css/Games.css';
import GameHeader from '../components/GameHeader';

export default function Game({ type }) {
  const [randomCountry, setRandomCountry] = useState(null);
  const [buttonOptions, setButtonOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [fail, setFail] = useState(0);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateWrongButtons = (data, correctButton, count) => {
    const options = type === 'capital'
      ? data.map(country => country.capital)
      : data.map(country => country.name.common);

    const filteredOptions = options.filter(option => option !== correctButton);
    const wrongButtons = shuffleArray(filteredOptions);
    return wrongButtons.slice(0, count);
  };

  const fetchData = async () => {
    try {
      const res = await fetch('https://restcountries.com/v3.1/all');
      const data = await res.json();
      const randomCountry = data[Math.floor(Math.random() * data.length)];
      setRandomCountry(randomCountry);

      const correctButton = type === 'capital' ? randomCountry.capital : randomCountry.name?.common;
      const wrongButtons = generateWrongButtons(data, correctButton, 3);
      setButtonOptions(shuffleArray([...wrongButtons, correctButton]));
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleClickedButton = (option) => {
    const correctAnswer = type === 'capital' ? randomCountry.capital : randomCountry.name?.common;
    if (option === correctAnswer) {
      setScore(score + 1);
    } else {
      setFail(fail + 1);
      alert('Wrong! It is ' + correctAnswer);
    }
    fetchData();
  };

  const resetGame = () => {
    setScore(0);
    setFail(0);
    fetchData();
  };

  if (!randomCountry || buttonOptions.length === 0) {
    return <div>Loading...</div>;
  }

  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
    }
    return shuffledArray;
  }

  const flagSource = type === 'coatsarms' ? randomCountry.coatOfArms.svg : randomCountry.flags.svg;
  const countryName = type === 'capital' && randomCountry.name.common;

  return (
    <div className="game">
      <GameHeader score={score} fail={fail} resetGame={resetGame} />
      <div className="game-body">
        <div className="flag-container">
          <img src={flagSource} alt="country flag" />
        </div>

        {countryName && <h1>{countryName}</h1>}

        <div className="game-options">
          {buttonOptions.map((option, index) => (
            <button
              key={index}
              className="game-option-button"
              onClick={() => handleClickedButton(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
