import React from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import Dropdown from "./HeaderDropdown";
import SortIcon from "@mui/icons-material/Sort";
import { Button } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Heading() {
  const date = new Date();
  const currentTime = date.getHours();
  var dd = String(date.getDate()).padStart(2, "0");
  var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = date.getFullYear();
  var today = mm + "/" + dd + "/" + yyyy;

  let greeting;

  if (currentTime < 12) {
    greeting = "Good Morning";
  } else if (currentTime < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Night";
  }

  // const [error, setError] = useState("");
  // const { currentUser, logout } = useAuth();
  // const history = useNavigate();

  // async function handleLogout() {
  //   setError("");

  //   try {
  //     await logout();
  //     history.push("/login");
  //   } catch {
  //     setError("Failed to log out");
  //   }
  // }

  return (
    <div className="heading">
      <div className="headingGreeting">
        <SortIcon />
        <h1>{greeting}</h1>
      </div>
      <div className="headingNav">
        <NotificationsNoneIcon className="icon" />
        <MailOutlinedIcon className="icon" />

        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
          alt="avatar"
          className="circle-img"
        />
        <div>
          <p>User Name</p>
          <p style={{ color: "gray" }}>{today}</p>
        </div>
        <Dropdown />
        {/* <Button onClick={handleLogout}></Button> */}
      </div>
    </div>
  );
}
