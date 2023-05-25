import { StarknetConfig } from "@starknet-react/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { connectors } from "./lib/starknetConfig.ts";
import "./index.css";
import Source from "./components/Source.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // React context that provides access to
  // starknet-react hooks and shared state
  <React.StrictMode>
    <StarknetConfig
      connectors={connectors}
      // defaultProvider={...}
      // autoConnect={false}
    >
      <App />
      <Source />
    </StarknetConfig>
  </React.StrictMode>
);
