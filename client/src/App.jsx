import React, { useState } from 'react';
import Runner from './Runner/Runner';
import HomePage from './HomePage';

export default function App() {
  const [gameState, setGameState] = useState();
  let renderedPage;
  switch (gameState) {
    case 'runner':
      renderedPage = (
        <>
          <button type="button" className="back" onClick={() => setGameState(null)}>
            Back
          </button>
          <Runner setGameState={setGameState} />
        </>
      );
      break;
    default:
      renderedPage = <HomePage setGameState={setGameState} />;
  }

  return renderedPage;
}
