import React, { useState, useContext, useEffect } from "react";
import { getMonth } from "../../util";
import CalendarHeader from "./CalendarHeader";
import Sidebar from "./Sidebar";
import Month from "./Month";
import GlobalContext from "./GlobalContext";
import EventModal from "./EventModal";
import { NavBar } from "../homePage/NavBar";
import "./styles/calendar.css"

export default function Calendar() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      <NavBar />
      {showEventModal && <EventModal />}

      <div className="tw-h-screen tw-flex tw-flex-col calendar">
        <CalendarHeader />
        <div className="tw-flex tw-flex-1">
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}
