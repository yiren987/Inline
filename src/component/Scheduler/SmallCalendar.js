import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "./GlobalContext";
import { getMonth } from "../../util";

export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  const { monthIndex, setSmallCalendarMonth, setDaySelected, daySelected } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }
  function getDayClass(day) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return "tw-bg-blue-500 tw-rounded-full tw-text-white";
    } else if (currDay === slcDay) {
      return "tw-bg-blue-100 tw-rounded-full tw-text-blue-600 tw-font-bold";
    } else {
      return "";
    }
  }
  return (
    <div className="tw-mt-9">
      <header className="tw-flex tw-justify-between">
        <p className="tw-text-black-500 tw-font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div>
          <button onClick={handlePrevMonth}>
            <span className="tw-material-icons-outlined tw-cursor-pointer tw-text-black-600 tw-mx-2 tw-font-bold">
              ←
            </span>
          </button>
          <button onClick={handleNextMonth}>
            <span className="tw-material-icons-outlined tw-cursor-pointer tw-text-black-600 tw-mx-2 tw-font-bold">
              →
            </span>
          </button>
        </div>
      </header>
      <div className="tw-grid tw-grid-cols-7 tw-grid-rows-6">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="tw-text-sm tw-py-1 tw-text-center">
            {day.format("dd").charAt(0)}
          </span>
        ))}
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                className={`tw-py-1 tw-w-full ${getDayClass(day)}`}
              >
                <span className="tw-text-sm">{day.format("D")}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
