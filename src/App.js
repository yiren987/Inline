import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./Calendar/CalendarUtil";
import CalendarHeader from "./Calendar/CalendarHeader";
import Sidebar from "./Calendar/Sidebar";
import Month from "./Calendar/Month";
import GlobalContext from "./Context/GlobalContext";
import EventModal from "./Calendar/EventModal";
function App() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      {showEventModal && <EventModal />}

      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
