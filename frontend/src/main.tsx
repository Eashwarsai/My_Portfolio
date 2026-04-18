/*
 * Application Entry Point
 *
 * WHAT: The very first JavaScript file that runs. Mounts React to the DOM.
 * WHY:  This is where React "takes over" the HTML page. Everything
 *       in the app flows from this single mount point.
 * HOW:  
 *       1. Imports the root CSS (index.css — design tokens, Tailwind directives)
 *       2. Finds the <div id="root"> in index.html
 *       3. Creates a React root (React 18's createRoot — enables concurrent features)
 *       4. Renders the App component tree into that div
 *
 * React.StrictMode: Development-only wrapper that:
 *   - Warns about deprecated APIs
 *   - Double-renders components to detect side effects
 *   - Does NOT affect production builds
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
