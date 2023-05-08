import React, { useState, useContext, useEffect } from "react";
import { getMonth } from "../../util";
import CalendarHeader from "./CalendarHeader";
import Sidebar from "./Sidebar";
import Month from "./Month";
import GlobalContext from "./GlobalContext";
import EventModal from "./EventModal";
import { NavMain } from "../main/NavMain";
import Heading from "../main/Header";
import "./styles/calendar.css";

export default function Calendar() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      <Heading />
      <div className="containers padd240">
        <NavMain />
        {showEventModal && <EventModal />}

        <div className="tw-h-screen tw-flex tw-flex-col calendar">
          <div className="header-container">
            <CalendarHeader />
          </div>
          <div className="tw-flex tw-flex-1">
            <Sidebar />
            <Month month={currenMonth} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
