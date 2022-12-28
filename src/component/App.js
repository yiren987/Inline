import React from "react";
import "../home.css";
import "../nav.css";
import SignPage from "./signinLogin/SignPage";
import { NavMain } from "./main/NavMain";
import Calendar from "./calendar/Calendar";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./homePage/HomePage";
import Friends from "./main/Friends";

function App() {
  return (
    <>
      <SignPage />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<NavMain />} />
        <Route path="/Schedule" element={<Calendar />} />
        <Route path="/friends" element={<Friends />} />
      </Routes>
    </>
  );
}

export default App;
