import React from "react";
import "../home.css";
import "../nav.css";
import SignPage from "./signinLogin/SignPage";
import { NavMain } from "./main/NavMain";
import Calendar from "./calendar/Calendar";
import { Route,Routes } from "react-router-dom";
import PrivateRoutes from "../contexts/PrivateRouting";

function App() {
  return (
    <>
      
      <SignPage />
      <Routes>
        <Route  path="/dashboard" element={<NavMain/>} />
        <Route  path="/Schedule" element={<Calendar/>} />
      </Routes>
      
      {/* <NavMain /> */}
      {/* <Calendar /> */}
      {/* <HomePage /> */}
    </>
  );
}

export default App;
