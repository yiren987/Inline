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
    <header className="tw-px-4 tw-py-2 tw-flex tw-items-center cal-header">
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
