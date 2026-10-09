import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Global styles for the whole app.

// This is the entry point of the app.
// It finds the <div id="root"> in index.html and renders our <App /> inside it.
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
