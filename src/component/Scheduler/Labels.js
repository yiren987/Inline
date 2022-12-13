import React, { useContext } from "react";
import GlobalContext from "./GlobalContext";

export default function Labels() {
  const { labels, updateLabel } = useContext(GlobalContext);
  return (
    <React.Fragment>
      <p className="tw-text-gray-500 tw-font-bold tw-mt-10">Labels</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className="tw-items-center tw-mt-3 tw-block">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => updateLabel({ label: lbl, checked: !checked })}
            className={`tw-form-checkbox tw-h-5 tw-w-5 tw-text-${lbl}-400 tw-rounded tw-focus:ring-0 tw-cursor-pointer`}
          />
          <span className="tw-ml-2 tw-text-gray-700 tw-capitalize">{lbl}</span>
        </label>
      ))}
    </React.Fragment>
  );
}
