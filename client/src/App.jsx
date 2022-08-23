import React, { useState } from 'react';
import Runner from './Runner/Runner';
import HomePage from './HomePage';
import Signup from './Signup';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import app from './firebase';
import { getAuth, signOut, browserSessionPersistence } from 'firebase/auth';

const auth = getAuth();

export default function App() {
  const [gameState, setGameState] = useState();
  const [currentUser, setCurrentUser] = useState();
  let renderedPage;
  function logout() {
    signOut(auth)
      .then(() => {
        alert('Logged out');
      })
      .catch((error) => {
        alert(error);
      });
  }
  switch (gameState) {
    case 'runner':
      renderedPage = (
        <>
          <button
            type="button"
            className="back"
            onClick={() => setGameState('home')}
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => {
              logout(auth);
              setGameState('login');
            }}
          >Log Out</button>
          <Runner setGameState={setGameState} currentUser={currentUser} />
        </>
      );
      break;
    case 'home':
      renderedPage = (
        <>
          <button
            type="button"
            onClick={() => {
              logout(auth);
              setGameState('login');
            }}
          >Log Out</button>
          <HomePage setGameState={setGameState} gameState />
        </>
      );
      break;
    case 'login':
      renderedPage = (
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: '100vh' }}
        >
          <div className="w=100" style={{ maxWidth: '400px' }}>
            <Login
              setCurrentUser={setCurrentUser}
              setGameState={setGameState}
            />
          </div>
        </Container>
      );
      break;
    default:
      renderedPage = (
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: '100vh' }}
        >
          <div className="w=100" style={{ maxWidth: '400px' }}>
            <Signup setGameState={setGameState} />
          </div>
        </Container>
      );
  }

  return renderedPage;
}
