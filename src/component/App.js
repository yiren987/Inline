import React from "react";
import Friends from "./Friends";
import Navbar from "./Navbar";
import Home from "./Home";
import Heading from "./Header";
import {HomePage} from "./homePage/HomePage";
import { Route, Routes } from "react-router-dom";
import Calendar from "./calendar/Calendar";
import "../home.css";
import "../nav.css";

function App() {
  return (
    <>
      <Navbar />
      <Heading />
      <div className="containers">
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/friends" element={<Friends />} />
        </Routes>
      </div>
      {/* <Calendar /> */}
      {/* <HomePage /> */}
    </>
  );
}

export default App;
