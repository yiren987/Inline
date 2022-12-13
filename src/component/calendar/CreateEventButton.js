import React, { useContext } from "react";
import plusImg from "../../assets/plus.png";
import GlobalContext from "./GlobalContext";
export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);
  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="tw-border tw-p-2 tw-rounded-full tw-flex tw-items-center tw-shadow-md tw-hover:shadow-2xl"
    >
      <img src={plusImg} alt="create_event" className="tw-w-7 tw-h-7" />
      <span className="tw-pl-3 tw-pr-7"> Create Event</span>
    </button>
  );
}
