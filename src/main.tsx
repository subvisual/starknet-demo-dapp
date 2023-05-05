import { StarknetConfig } from "@starknet-react/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { connectors } from "./lib/starknetConfig.ts";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StarknetConfig connectors={connectors}>
      <App />
    </StarknetConfig>
  </React.StrictMode>
);
