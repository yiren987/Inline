import React from "react";
import Friends from "./Friends";
import Navbar from "./Navbar";
import Home from "./Home";
import Heading from "./Header";
import "../nav.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Heading />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
