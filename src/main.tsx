import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Source from "./components/Source.tsx";
import { StarknetProvider } from "./components/StarknetProvider.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // React context that provides access to
  // starknet-react hooks and shared state
  <React.StrictMode>
    <StarknetProvider>
      <App />
      <Source />
    </StarknetProvider>
  </React.StrictMode>
);
