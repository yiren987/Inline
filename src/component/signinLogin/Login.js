import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "../homePage/NavBar";
// import { db } from "../../firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export default function Login() {
  // const emailOrUsernameRef = useRef();
  // const passwordRef = useRef();
  // const { login } = useAuth();
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true);
  //   try {
  //     const emailOrUsername = emailOrUsernameRef.current.value;
  //     const password = passwordRef.current.value;
  //     const userQuerySnapshot = await db
  //       .collection("users")
  //       .where("username", "==", emailOrUsername)
  //       .get();
  //     let email = "";
  //     userQuerySnapshot.forEach((doc) => {
  //       email = doc.data().email;
  //     });
  //     await login(email || emailOrUsername, password);
  //     navigate("/dashboard");
  //   } catch (e) {
  //     setError(e.message);
  //     console.log(e.message);
  //   }
  //   setLoading(false);
  // };

  const emailOrUsernameRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const emailOrUsername = emailOrUsernameRef.current.value;
      const password = passwordRef.current.value;
      const userQuerySnapshot = await firebase.firestore().collection("users").where("username", "==", emailOrUsername).get();
      let email = "";
      userQuerySnapshot.forEach((doc) => {
        email = doc.data().email;
      });
      await login(email || emailOrUsername, password);
      navigate("/dashboard");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
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
        <div className="w-50 mx-auto">
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Log In</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="emailOrUsername">
                  <Form.Label>Email or Username</Form.Label>
                  <Form.Control type="text" ref={emailOrUsernameRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Log In
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
}