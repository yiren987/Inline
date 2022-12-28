import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CustomeLink from "./CustomeLink";

export const NavMain = () => {
  return (
    <div className="">
      <div className="leftContainer">
        <nav className="nav">
          <CustomeLink to="/" className="appName">
            Inline
          </CustomeLink>
          <ul>
            <CustomeLink to="/dashboard" className="navText">
              <HomeIcon className="icon" />
              Dashboard
            </CustomeLink>
            <CustomeLink to="/schedule" className="navText">
              <DateRangeIcon className="icon" />
              Schedule
            </CustomeLink>

            <CustomeLink to="/friends" className="navText">
              <Diversity1Icon className="icon" />
              Friends
            </CustomeLink>
            <CustomeLink to="/tasks" className="navText">
              <ListAltIcon className="icon" />
              Tasks
            </CustomeLink>
            <CustomeLink to="/account" className="navText">
              <AccountCircleIcon className="icon" />
              Account
            </CustomeLink>
          </ul>
        </nav>
      </div>
    </div>
  );
};
