import React from "react";

export const NavBar = () => {
  function handleScroll() {
    // Get the navigation links
    const navLinks = document.querySelectorAll(".nav_links li a");

    // Get the position of each section on the page
    const servicesPos = document.querySelector("#services").offsetTop;
    const aboutPos = document.querySelector("#about").offsetTop;

    // Get the current scroll position
    const scrollPos = window.pageYOffset;

    // Get the current height of the navigation bar
    const navHeight = document.querySelector(".navHeader").offsetHeight;

    // Check the scroll position and apply the active class to the corresponding navigation link
    if (scrollPos + navHeight >= aboutPos) {
      navLinks[1].classList.add("active");
      navLinks[0].classList.remove("active");
    } else if (scrollPos + navHeight >= servicesPos) {
      navLinks[0].classList.add("active");
      navLinks[1].classList.remove("active");
    } else {
      navLinks[0].classList.remove("active");
      navLinks[1].classList.remove("active");
    }
  }

  // Attach the scroll event listener to the window object
  window.addEventListener("scroll", handleScroll);

  return (
    <div className="navHeader fixed-top d-flex align-items-center header-transparent">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="logo">
          <h1>
            <a href="/">Inline</a>
          </h1>
        </div>
        <nav className="navbar">
          <ul className="nav_links">
            <li>
              <a className="active" href="#services">
                Services
              </a>
            </li>
            <li>
              <a className="" href="#about">
                About
              </a>
            </li>
          </ul>
        </nav>
        <a className="" href="/login">
          <button>Sign In</button>
        </a>
      </div>
    </div>
  );
};
