import React, { useRef } from 'react';
import { StyledRunner } from './Runner.styled';
import ground from '../../images/ground.png';
import player from '../../images/player-stationary.png';

export default function Runner({ setGameState }) {
  const canvasRef = useRef();
  const canvasWidth = 100;
  const canvasHeight = 30;
  const scaleCanvas = (e) => {
    console.log(e.target);
    let canvasScale;
    if (window.innerWidth / window.innerHeight < canvasWidth / canvasHeight) {
      canvasScale = window.innerWidth / canvasWidth;
    } else {
      canvasScale = window.innerHeight / canvasHeight;
    }
    console.log(canvasWidth, canvasScale);
    canvasRef.style.width = `${canvasWidth * canvasScale}px`;
    canvasRef.style.height = `${canvasHeight * canvasScale}px`;
  };
  window.addEventListener('resize', scaleCanvas);

  return (
    <StyledRunner>
      <div className="canvas" ref={canvasRef}>
        <div className="score">0</div>
        <div className="start">Press Any Key To Start</div>
        <img src={ground} className="ground" />
        <img src={ground} className="ground" />
        <img src={player} className="player" />
      </div>
    </StyledRunner>
  );
}
