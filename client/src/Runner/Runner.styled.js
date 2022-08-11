import styled from 'styled-components';

export  const StyledRunner = styled.div`
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  .hide {
    display: none;
  }
  .canvas {
    overflow: hidden;
    position: relative;

  }
  .score {
    position: absolute;
    font-size: 3vmin;
    right: 1vmin;
    top: 1vmin;
  }
  .start {
    position: absolute;
    font-size: 5vmin;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .ground {
    position: absolute;
    width: 300%;
    bottom: 0;
    left: calc(var(--left) * 1%);
  }

  .player {
    --bottom: 0;
    position: absolute;
    left: 1%;
    height: 10vh;
    bottom: calc(var(--bottom) * 1%);
  }

  .obstacle {
    position:absolute;
    left: calc(var(--left) * 1%);
    height: 30%;
    bottom: 0;
  }
`;
