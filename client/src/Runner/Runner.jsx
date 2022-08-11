/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { StyledRunner } from './Runner.styled';
import ground from '../../images/ground.png';
import player from '../../images/player-stationary.png';
import {
  incrementCssVariable,
  setCssVariable,
  getCssVariable,
} from './cssFunctions';
import { updatePlayer, setupPlayer} from './player';
import { updateObstacle, setupObstacle} from './obstacle';

export default function Runner({ setGameState }) {
  // Canvas setup
  const canvasRef = useRef();
  const ground1 = useRef();
  const ground2 = useRef();
  const scoreElement = useRef();
  const startRef = useRef();
  const playerRef = useRef();
  const canvasWidth = 100;
  const canvasHeight = 30;
  const scaleCanvas = () => {
    let canvasScale;
    if (window.innerWidth / window.innerHeight < canvasWidth / canvasHeight) {
      canvasScale = window.innerWidth / canvasWidth;
    } else {
      canvasScale = window.innerHeight / canvasHeight;
    }
    console.log(canvasWidth, canvasScale, canvasRef.current.style);
    canvasRef.current.style.width = `${canvasWidth * canvasScale}px`;
    canvasRef.current.style.height = `${canvasHeight * canvasScale}px`;
  };
  window.addEventListener('resize', scaleCanvas);
  // Set infinite ground
  const setGround = () => {
    setCssVariable(ground1.current, '--left', 0);
    setCssVariable(ground2.current, '--left', 300);
  };

  // Ground movement logic
  let lastTime;
  let first = 0;
  let speedScale;
  let score;
  const speedIncrease = 0.00001;
  function update(time) {
    if (lastTime === null) {
      lastTime = time;
      window.requestAnimationFrame(update);
      return;
    }
    const delta = time - lastTime;
    updateGround(delta, speedScale);
    updatePlayer(playerRef.current, delta, speedScale);
    updateSpeedScale(delta);
    updateScore(delta);
    updateObstacle(canvasRef.current, delta, speedScale);
    lastTime = time;
    window.requestAnimationFrame(update);
  }

  const updateSpeedScale = (delta) => {
    speedScale += delta * speedIncrease;
  };
  // Moves the ground
  const updateGround = (delta, speedScale) => {
    const groundElements = [ground1.current, ground2.current];
    const speed = 0.05;

    incrementCssVariable(
      ground1.current,
      '--left',
      delta * speedScale * speed * -1
    );

    incrementCssVariable(
      ground2.current,
      '--left',
      delta * speedScale * speed * -1
    );

    if (first === 0) {
      setGround();
      first++;
    }
    if (getCssVariable(ground2.current, '--left') <= -300) {
      incrementCssVariable(ground2.current, '--left', 600);
    }
    if (getCssVariable(ground1.current, '--left') <= -300) {
      incrementCssVariable(ground1.current, '--left', 600);
    }
  };

  // Score handling
  const updateScore = (delta) => {
    score += delta * 0.01;
    scoreElement.current.innerText = Math.floor(score);
  }

  // Starts the game
  const startGame = () => {
    lastTime = null;
    window.requestAnimationFrame(update);
    speedScale = 1;
    score = 0;
    startRef.current.classList.add('hide');
    setupPlayer(playerRef.current);
    setupObstacle(canvasRef.current)
    setGround();
  }
  document.addEventListener('keydown', startGame, { once: true });

  useEffect(scaleCanvas, []);
  useLayoutEffect(setGround, []);
  return (
    <StyledRunner>
      <div className="canvas" ref={canvasRef}>
        <div className="score" ref={scoreElement}>0</div>
        <div className="start" ref={startRef}>Press Any Key To Start</div>
        <img src={ground} className="ground" ref={ground1} />
        <img src={ground} className="ground" ref={ground2} />
        <img src={player} className="player" ref={playerRef} />
      </div>
    </StyledRunner>
  );
}
