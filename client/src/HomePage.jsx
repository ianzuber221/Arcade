import React from 'react';

export default function HomePage({ setGameState }) {
  return (
    <>
      <h1 className="homepage">Welcome to Ian&apos;s Arcade</h1>
      <h2 className="homepage">Choose a game</h2>
      <ul>
        <li onClick={() => setGameState('runner')}>Dino Runner</li>
      </ul>
    </>
  );
}
