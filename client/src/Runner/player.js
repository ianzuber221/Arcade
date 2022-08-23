import StationaryPlayer from '../../images/player-stationary.png';
import playerRun0 from '../../images/player-run-0.png';
import playerRun1 from '../../images/player-run-1.png';
import playerLoseSrc from '../../images/player-lose.png';
import {
  incrementCssVariable,
  getCssVariable,
  setCssVariable,
} from './cssFunctions';
const jump = 0.45;
const gravity = 0.0015;
const playerFrames = 2;
const frameTime = 100;
let currentFrameTime;
const runners = [playerRun0, playerRun1];
let jumping;
let frame;
let yVelocity;
export function setupPlayer(player) {
  jumping = false;
  frame = 0;
  currentFrameTime = 0;
  yVelocity = 0;
  setCssVariable(player, '--bottom', 0);
  document.removeEventListener('keydown', onJump);
  document.addEventListener('keydown', onJump);
}

export function updatePlayer(player, delta, speedScale) {
  run(player, delta, speedScale);
  handleJump(player, delta, speedScale);
}

function run(player, delta, speedScale) {
  if (jumping) {
    player.src = StationaryPlayer;
    return;
  }
  if (currentFrameTime >= frameTime) {
    frame = (frame + 1) % playerFrames;
    // might have to parse int
    player.src = runners[frame];
    currentFrameTime -= frameTime;
  }
  currentFrameTime += delta * speedScale;
}

export function handleJump(player, delta, speedScale) {
  if (!jumping) {
    return;
  }
  incrementCssVariable(player, '--bottom', yVelocity * delta);
  if (getCssVariable(player, '--bottom') <= 0) {
    setCssVariable(player, '--bottom', 0);
    jumping = false;
  }
  yVelocity -= gravity * delta;
}
function onJump(e) {
  if (e.code !== 'Space' || jumping) return;
  yVelocity = jump;
  jumping = true;
}

export function getPlayerRect(player) {
  return player.getBoundingClientRect();
}
export function playerLose(player) {
  player.src = playerLoseSrc;
}
