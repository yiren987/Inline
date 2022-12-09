import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className=" align-items-center justify-content-center text-center">
      <p>Copyright ⓒ {year}</p>
    </footer>
  );
}

export default Footer;
