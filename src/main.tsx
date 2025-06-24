import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "antd/dist/antd.css";
import "./styles/index.css";
import "./styles/old.css";
import "./i18n";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/pretty-derby">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
