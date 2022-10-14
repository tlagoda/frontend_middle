import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BeerProvider } from "./contexts/BeerContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BeerProvider>
    <App />
  </BeerProvider>
);
