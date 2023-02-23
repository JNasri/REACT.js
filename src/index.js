// this is the main page were all componets are shown

// react imports
import React from "react";
import ReactDOM from "react-dom/client";
// here we have the main css file, if any component needs a special css,
// we need to have a seperate css file and import it in the component's file
import "./index.css";
// import the app component
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
