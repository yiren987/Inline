import React from "react";
// import "../../home.css";
import { Section1 } from "./Section1";
import { NavBar } from "./NavBar";
import { Section2 } from "./Section2";
import Footer from "./Footer";
export const HomePage = () => {
  return (
    <div>
      <NavBar />
      <Section1 />
      <Section2 />
      <Footer />
    </div>
  );
};
