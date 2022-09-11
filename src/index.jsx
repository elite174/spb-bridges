/* @refresh reload */
import { render } from "solid-js/web";
import { registerSW } from "virtual:pwa-register";

import App from "./App";

import "./index.css";

// Check for updates of SW every hour;
const intervalMS = 60 * 60 * 1000;

registerSW({
  onRegistered(registration) {
    if (!registration) return;

    setInterval(() => {
      registration.update();
    }, intervalMS);
  },
});

render(() => <App />, document.getElementById("root"));
