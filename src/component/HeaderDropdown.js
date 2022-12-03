import React from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function Dropdown() {
  //  dropdown reference: https://www.youtube.com/watch?v=S-VeYcOCFZw

  document.addEventListener("click", handleClick);
  function handleClick(e) {
    const isDropdown = e.target.matches("[data-dropdown-button]");
    if (!isDropdown && e.target.closest("[data-dropdown]") != null) return;

    let currentDropdown;
    if (isDropdown) {
      currentDropdown = e.target.closest("[data-dropdown]");
      currentDropdown.classList.toggle("active");
    }

    document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
      if (dropdown === currentDropdown) return;
      dropdown.classList.remove("active");
    });
  }

  return (
    <div className="dropdown" data-dropdown onClick={handleClick}>
      <button className="link">
        <ArrowDropDownIcon className="icon" data-dropdown-button />
      </button>
      <div className="dropdown-menu">
        <a href="/#">Profile</a>
        <a href="/#">Profile</a>
        <a href="/#">Profile</a>
      </div>
    </div>
  );
}
