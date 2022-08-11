import React, { useEffect, useState } from 'react';
var axios = require('axios');

export default function HomePage({ setGameState, gameState }) {
  const [scorelist, setscorelist] = useState([]);
  const renderScoreList = () => {
    const config = {
      method: 'get',
      url: '/scores',
    };

    axios(config)
      .then((responses) => {
        console.log(responses, 'yoooooo');
        let arr = [];
        responses.data.forEach((response) => {
          const responseMax = Math.max(...response.scores);
          arr.push(
            <>
              <li>{response.userEmail}</li>
              <p>{responseMax}</p>
            </>,
          );
            setscorelist(arr);
          console.log(scorelist);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(renderScoreList, [gameState]);

  return (
    <>
      <h1 className="homepage">Welcome to Ian&apos;s Arcade</h1>
      <h2 className="homepage">Choose a game</h2>
      <ul>
        <li onClick={() => setGameState('runner')}>Dino Runner</li>
      </ul>
      <h1>High Scores</h1>
      <ul>{scorelist}</ul>
    </>
  );
}
