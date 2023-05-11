import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "../homePage/NavBar";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

export default function Signup() {

  // users collection contains users with their email address, 
  // and that conatins some fields such as email, username, portraitURL, and contains another friends collection
  // inside that friends collection

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const usernameRef = useRef();
  const portraitRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const username = usernameRef.current.value;
      const portrait = portraitRef.current.files[0];
  
      // Signup the user with email and password
      await signup(email, password);
  
      // Save the username and portrait to the database
      const user = firebase.auth().currentUser;
      const storageRef = firebase.storage().ref(`users/${user.uid}/portrait.jpg`);
      const snapshot = await storageRef.put(portrait);
      const portraitURL = await snapshot.ref.getDownloadURL();
  
      const userData = {
        email: email,
        username: username,
        portraitURL: portraitURL
      };
  
      await firebase.firestore().collection("users").doc(user.uid).set(userData);
  
      // Create the friends collection for the user
      const friendsCollection = firebase.firestore().collection("users").doc(user.uid).collection("friends");
  
      // Add the current user as the first friend to the collection
      const currentUserData = {
        email: email,
        username: username,
        portraitURL: portraitURL
      };
      await friendsCollection.doc(user.uid).set(currentUserData);
  
      navigate("/dashboard");
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };
  

  return (
    <>
      <NavBar />
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ marginTop: "240px" }}
      >
        <div className="w-50">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" ref={usernameRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>
                <Form.Group id="portrait">
                  <Form.Label>Portrait</Form.Label>
                  <Form.Control type="file" ref={portraitRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
    </>
  );
}

