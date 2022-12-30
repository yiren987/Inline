import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Alert } from "react-bootstrap";

export const Profile = () => {
  const [error, setError] = useState("");
  const { currentUser } = useAuth();

  return (
    <div>
      <div className="d-flex justify-content-center padd240">
        <div className="mx-auto pt-4 text-center ">
          <h2 className="text-center">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
};
