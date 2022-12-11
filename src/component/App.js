import React from "react";
import Friends from "./Friends";
import Navbar from "./Navbar";
import Home from "./Home";
import Heading from "./Header";
import "../nav.css";
import { Route, Routes } from "react-router-dom";
import Calendar from "./calendar/Calendar";

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
    </>
  );
}

export default App;
