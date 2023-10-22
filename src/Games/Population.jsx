import React, { useEffect, useState } from 'react';
import '../css/Games.css';
import GameHeader from '../components/GameHeader';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country1, setCountry1] = useState(null);
  const [country2, setCountry2] = useState(null);
  const [score, setScore] = useState(0);
  const [fail, setFail] = useState(0);


  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        getRandomCountries(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const getRandomCountries = (data) => {
    const countryIndex1 = Math.floor(Math.random() * data.length);
    let countryIndex2 = Math.floor(Math.random() * data.length);
    // Make sure the second country is different from the first one
    while (countryIndex2 === countryIndex1) {
      countryIndex2 = Math.floor(Math.random() * data.length);
    }

    setCountry1(data[countryIndex1]);
    setCountry2(data[countryIndex2]);
  };


  const handleGuess = (selectedCountry) => {
    if (country1.population > country2.population && selectedCountry === 'country1') {
      setScore(score + 1);
    } else if (country2.population > country1.population && selectedCountry === 'country2') {
      setScore(score + 1);
    } else {
      setFail(fail + 1);
      alert('Wrong! It is ' + (country1.population > country2.population ? country1.name.common : country2.name.common) + '. It has a population of ' + (country1.population > country2.population ? country1.population : country2.population) + '. and Other country has a population of ' + (country1.population > country2.population ? country2.population : country1.population));
    }

    // Fetch new random countries for the next round
    getRandomCountries(countries);
  };

  function resetGame() {
    setScore(0);
    setFail(0);
  }

  return (
    <div className="game">
      <GameHeader score={score} fail={fail} resetGame={resetGame} />   
      {country1 && country2 && (
        <div className="game-body">
          <h1>Which country has a higher population?</h1>
          <div className="game-options-flag">
            <button
              onClick={() => handleGuess('country1')}
              className='game-option-button-flag'>
              <img src={country1.flags.svg} alt="country flag" />
              {country1.name.common}
            </button>
            <button
              onClick={() => handleGuess('country2')}
              className='game-option-button-flag'>
              <img src={country2.flags.svg} alt="country flag" />
              {country2.name.common}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
