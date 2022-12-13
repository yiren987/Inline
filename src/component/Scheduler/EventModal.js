import React, { useContext, useState } from "react";
import GlobalContext from "./GlobalContext";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }
  return (
    <div className="tw-h-screen tw-w-full tw-fixed tw-left-0 tw-top-0 tw-flex tw-justify-center tw-items-center">
      <form className="tw-bg-white tw-rounded-lg tw-shadow-2xl tw-w-1/4">
        <header className="tw-bg-gray-100 tw-px-4 tw-py-2 tw-flex tw-justify-between tw-items-center">
          <span className="tw-material-icons-outlined tw-text-gray-400">
            Event
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectedEvent,
                  });
                  setShowEventModal(false);
                }}
                className="tw-material-icons-outlined tw-text-gray-400 tw-cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="tw-material-icons-outlined tw-text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="tw-p-3">
          <div className="tw-grid tw-grid-cols-1/5 tw-items-end tw-gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={title}
              required
              className="tw-pt-3 tw-border-0 tw-text-gray-600 tw-text-xl tw-font-semibold tw-pb-2 tw-w-full tw-border-b-2 tw-border-gray-200 tw-focus:outline-none tw-focus:ring-0 tw-focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="tw-material-icons-outlined tw-text-gray-400">
              Event Date
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <span className="tw-material-icons-outlined tw-text-gray-400">
              Description
            </span>
            <input
              type="text"
              name="description"
              placeholder="Event description"
              value={description}
              required
              className="tw-pt-3 tw-border-0 tw-text-gray-600 tw-pb-2 tw-w-full tw-border-b-2 tw-border-gray-200 tw-focus:outline-none tw-focus:ring-0 tw-focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="tw-material-icons-outlined tw-text-gray-400">
              LabelColor
            </span>
            <div className="tw-flex tw-gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`tw-bg-${lblClass}-500 tw-w-6 tw-h-6 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="tw-material-icons-outlined tw-text-white tw-text-sm">
                      ✓
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="tw-flex tw-justify-end tw-border-t tw-p-3 tw-mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="tw-bg-blue-500 tw-hover:bg-blue-600 tw-px-6 tw-py-2 tw-rounded tw-text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
