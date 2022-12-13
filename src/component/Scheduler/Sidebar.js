import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";
export default function Sidebar() {
  return (
    <aside className="tw-border tw-p-5 tw-w-64">
      <CreateEventButton />
      <SmallCalendar />
      <Labels />
    </aside>
  );
}
