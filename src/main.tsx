import React from "react";
import ReactDOM from "react-dom/client";
import TreeExplorer from "./components/TreeExplorer/TreeExplorer.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TreeExplorer />
  </React.StrictMode>
);
