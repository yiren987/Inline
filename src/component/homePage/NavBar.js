import React from "react";

export const NavBar = () => {
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
              <a className="scrollto active" href="/#">
                Services
              </a>
            </li>
            <li>
              <a className="scrollto" href="/#about">
                About
              </a>
            </li>
          </ul>
        </nav>
        <a className="" href="/#">
          <button>Sign Up</button>
        </a>
      </div>
    </div>
  );
};
