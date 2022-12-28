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
import Friends from "../main/Friends";
import { HomePage } from "../homePage/HomePage";
import Calendar from "../calendar/Calendar";
import { Profile } from "../main/Profile";
import { Account } from "../main/Account";
import { Tasks } from "../main/Tasks";

function SignPage() {
  return (
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
          <Route path="/" element={<HomePage />} />
          <Route
            path="/friends"
            element={
              <PrivateRoute>
                <Friends />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/schedule"
            element={
              <PrivateRoute>
                <Calendar />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/account"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default SignPage;
