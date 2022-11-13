import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Dropdown() {
  //  dropdown reference: https://www.youtube.com/watch?v=S-VeYcOCFZw

  function handleClick(e) {
    // const isDropdown = e.target.matches("[data-dropdown-button]");
    const isDropdown = e.target;
    if (!isDropdown && e.target.closest("[data-dropdown]") != null) return;

    let currentDrowdown;
    if (isDropdown) {
      currentDrowdown = e.target.closest("[data-dropdown]");
      currentDrowdown.classList.toggle("active");
    }
  }

  return (
    <div className="dropdown" data-dropdown>
      <button className="link" data-dropdown-button onClick={handleClick}>
        <ArrowDropDownIcon className="icon" />
      </button>
      <div className="dropdown-menu">
        <a href="/#">Profile</a>
        <a href="/#">Profile</a>
        <a href="/#">Profile</a>
      </div>
    </div>
  );
}
