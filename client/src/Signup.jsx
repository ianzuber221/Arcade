import React, { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { Card, Button, Form } from 'react-bootstrap';

export default function Signup({ setGameState }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  const auth = getAuth();

  function signup(auth, email, password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        alert('Successfully Created Account');
        setGameState('login');
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        alert("ERROR",errorCode);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    signup(auth, email, password);
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
          <h2 className="text-center mb-4">Sign Up</h2>
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
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                onChange={handlePasswordConfirmChange}
                required
              />
            </Form.Group>
            <br />
            <Button className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        {' '}
        Already have an account?{' '}
        <button type="button" onClick={() => setGameState('login')}>
          Log In
        </button>
      </div>
    </>
  );
}
