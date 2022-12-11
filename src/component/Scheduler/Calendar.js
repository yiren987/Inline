import React, { useState, useContext, useEffect } from "react";
import { getMonth } from "../../util";
import CalendarHeader from "./CalendarHeader";
import Sidebar from "./Sidebar";
import Month from "./Month";
import GlobalContext from "./GlobalContext";
import EventModal from "./EventModal";
import { NavBar } from "../homePage/NavBar";
import "./styles/Calendar.css"

export default function Calendar() {
    const [currenMonth, setCurrentMonth] = useState(getMonth());
    const { monthIndex, showEventModal } = useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

    return (
        <React.Fragment>
        {showEventModal && <EventModal />}
        <NavBar />
        <div class="body h-screen flex flex-col">
            <CalendarHeader />
            <div class="flex flex-1">
            <Sidebar />
            <Month month={currenMonth} />
            </div>
        </div>
        </React.Fragment>
    )
}

