import { StarknetConfig } from "@starknet-react/core";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { connectors } from "./lib/starknetConfig.ts";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotAnNft from "./components/NotAnNft.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StarknetConfig
      connectors={connectors}
      // defaultProvider={...}
      // autoConnect={false}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/not-an-nft" element={<NotAnNft />} />
        </Routes>
      </BrowserRouter>
    </StarknetConfig>
  </React.StrictMode>
);
