import React, { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Card, Button, Form } from 'react-bootstrap';

export default function Login({ setCurrentUser, setGameState }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  const auth = getAuth();

  function signin(auth, email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        alert('Sucessful Log in');
        setCurrentUser(user);
        setGameState('home');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        alert(errorCode);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    signin(auth, email, password);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handlePasswordConfirmChange(e) {
    setPasswordConfirm(e.target.value);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log in</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                onChange={handleEmailChange}
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>
              <br/>
            <Button className="w-100" type="submit">
              Log In
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        {' '}
        Don&apos;t have an account? <button type="button" onClick={() => setGameState('null')}>
          Sign Up
        </button>
      </div>
    </>
  );
}
