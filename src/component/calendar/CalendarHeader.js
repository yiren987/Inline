import dayjs from "dayjs";
import React, { useContext } from "react";
import logo from "../../assets/logo3.png";
import GlobalContext from "./GlobalContext";
export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  return (
    <header className="tw-px-4 tw-py-2 tw-flex tw-items-center">
      <img src={logo} alt="calendar" className="tw-mr-2 tw-w-30 tw-h-12" />
      <button
        onClick={handleReset}
        className="tw-border tw-rounded tw-py-2 tw-px-4 tw-mr-5"
      >
        Today
      </button>
      <button className="tw-arrows" onClick={handlePrevMonth}>
        <span className="tw-material-icons-outlined tw-cursor-pointer tw-text-gray-600 tw-mx-2">
          ←
        </span>
      </button>
      <button className="tw-arrows" onClick={handleNextMonth}>
        <span className="tw-material-icons-outlined tw-cursor-pointer tw-text-gray-600 tw-mx-2">
          →
        </span>
      </button>
      <h2 className="tw-ml-4 tw-text-xl tw-text-black-500 tw-font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  );
}
