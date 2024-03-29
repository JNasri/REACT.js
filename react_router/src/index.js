// this is the main page were all componets are shown

// react imports
import React from "react";
import ReactDOM from "react-dom/client";
// here we have the main css file, if any component needs a special css,
// we need to have a seperate css file and import it in the component's file
import "./index.css";
// import the app component
import App from "./App";
// importing BrowserRouter & Router from react-router
import { BrowserRouter as Router, Route } from "react-router-dom";
// importing the storeProvider
import { StoreProvider } from "easy-peasy";
// importing the store.js (easy-peasy redux library)
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <Router>
        <Route path="/" component={App} />
      </Router>
    </StoreProvider>
  </React.StrictMode>
);
