import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "./GlobalContext";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "tw-bg-blue-600 tw-text-white tw-rounded-full tw-w-7"
      : "";
  }
  return (
    <div className="tw-border tw-border-gray-200 tw-flex tw-flex-col">
      <header className="tw-flex tw-flex-col tw-items-center">
        {rowIdx === 0 && (
          <p className="tw-text-sm tw-mt-1">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`tw-text-sm tw-p-1 tw-my-1 tw-text-center  ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className="tw-flex-1 tw-cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`tw-bg-${evt.label}-200 tw-p-1 tw-mr-3 tw-text-gray-600 tw-text-sm tw-rounded tw-mb-1 tw-truncate`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}
