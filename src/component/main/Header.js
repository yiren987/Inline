import React, { useState, useEffect } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import Dropdown from "./HeaderDropdown";
import SortIcon from "@mui/icons-material/Sort";
import { Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import Notifications from "./Notifications";

export default function Heading() {
  const date = new Date();
  const currentTime = date.getHours();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Fetch the user's data from Firestore
    async function fetchUserData() {
      try {
        const userRef = firebase.firestore().collection("users").doc(currentUser.uid);
        const userData = await userRef.get();
        if (userData.exists) {
          setUserName(userData.data().username);
          setUserAvatar(userData.data().portraitURL);
        } else {
          setError("User data not found");
        }
      } catch (error) {
        setError(error.message);
      }
    }

    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = date.getFullYear();
  var today = mm + "/" + dd + "/" + yyyy;

  let greeting;

  if (currentTime < 12) {
    greeting = `Good Morning, ${userName}`;
  } else if (currentTime < 18) {
    greeting = `Good Afternoon, ${userName}`;
  } else {
    greeting = `Good Night, ${userName}`;
  }

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div className="heading">
      <div className="headingGreeting">
        <SortIcon />
        <h1>{greeting}</h1>
      </div>
      <div className="headingNav">
        <NotificationsNoneIcon className="icon" onClick={() => { setShowNotifications(!showNotifications); history("/notifications") }} />
        {/* {showNotifications && <Notifications />} */}
        <MailOutlinedIcon className="icon" />

        <img
          src={userAvatar}
          alt="avatar"
          className="circle-img user-img"
        />
        <div>
          <p>{userName}</p>
          <p style={{ color: "gray" }}>{today}</p>
        </div>
        <Dropdown />
        <Button
          className="btn btn-primary"
          variant="link"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
