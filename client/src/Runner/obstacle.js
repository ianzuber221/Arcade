import obstacleSrc from '../../images/obstacle.png';
import {
  incrementCssVariable,
  getCssVariable,
  setCssVariable,
} from './cssFunctions';

const speed = 0.05;
const obstacleMinInterval = 500;
const obstacleMaxInterval = 2000;

let nextObstacleTime;
export function setupObstacle(canvas) {
  nextObstacleTime = obstacleMinInterval;
  document.querySelectorAll('.obstacle').forEach((obstacle) => {
    obstacle.remove();
  });
}

export function updateObstacle(canvas, delta, speedScale) {
  document.querySelectorAll('.obstacle').forEach((obstacle) => {
    incrementCssVariable(obstacle, '--left', delta * speedScale * speed * -1);
    if (getCssVariable(obstacle, '--left') <= -100) {
      obstacle.remove();
    }
  });
  console.log(nextObstacleTime);
  if (nextObstacleTime <= 0) {
    createObstacle(canvas);
    console.log('hi')
    nextObstacleTime =
      (randomNumberBetween(obstacleMinInterval, obstacleMaxInterval) /
      speedScale);
  }
  nextObstacleTime -= delta;
}

function createObstacle(canvas) {
  const obstacle = document.createElement('img');
  obstacle.dataset.obstacle = true;
  obstacle.src = obstacleSrc;
  obstacle.classList.add('obstacle');
  setCssVariable(obstacle, '--left', 100);
  canvas.append(obstacle);
}

function randomNumberBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
