import React from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import Dropdown from "./HeaderDropdown";

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

  return (
    <div className="heading">
      <h1>{greeting}</h1>
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
      </div>
    </div>
  );
}
