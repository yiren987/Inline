import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ContextWrapper from "./component/Scheduler/ContextWrapper";
import "./index.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextWrapper>
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>
  </ContextWrapper>,
);