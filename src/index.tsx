import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom"; // Import HashRouter
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      {" "}
      {/* Sử dụng HashRouter thay cho BrowserRouter */}
      <App />
    </Router>
  </React.StrictMode>
);

reportWebVitals();
