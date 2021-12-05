import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "antd/dist/antd.css";
import 'antd-mobile/dist/antd-mobile.min.css';
import "./styles/tailwind.css";
// import "tailwindcss/tailwind.css";
import App from "./app";

const Index = () => {
  return (
    <Router>
      <App></App>
    </Router>
  );
};

ReactDOM.render(<Index></Index>, document.getElementById("root"));
