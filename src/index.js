import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./app";
import "./i18n";

import "antd/dist/antd.css";
import "./styles/tailwind.css";
import "./styles/index.css";

const Index = () => {
  return (
    <Router>
      <App></App>
    </Router>
  );
};

ReactDOM.render(<Index></Index>, document.getElementById("root"));
