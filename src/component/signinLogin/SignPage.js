import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../../contexts/AuthContext";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";

/*               <PrivateRoute path="/update-profile" element={UpdateProfile} />
 */

function SignPage() {
  return (
    <Container className="d-flex align-items-center justify-content-center">
      <div>
        <AuthProvider>
          <Routes>
            <Route
              path="/dashboard/*"
              className="w-100"
              style={{ maxWidth: "400px" }}
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/update-profile"
              className="w-100"
              style={{ maxWidth: "400px" }}
              element={
                <PrivateRoute>
                  <UpdateProfile />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/signup"
              element={<Signup />}
              className="w-100"
              style={{ maxWidth: "400px" }}
            />
            <Route
              path="/login"
              element={<Login />}
              className="w-100"
              style={{ maxWidth: "400px" }}
            />
            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
              className="w-100"
              style={{ maxWidth: "400px" }}
            />
          </Routes>
        </AuthProvider>
      </div>
    </Container>
  );
}

export default SignPage;
