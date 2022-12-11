import React from "react";
import ReactDOM from "react-dom/client";
import App from "./component/App";
import { BrowserRouter } from "react-router-dom";
import ContextWrapper from "./component/calendar/ContextWrapper";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextWrapper>
        <App />
      </ContextWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
