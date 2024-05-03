import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

// const manifestUrl = '/public/tonconnect-manifest.json';
// const manifestUrl =
  // "https://github.com/Blagoi4/TWA-Template/blob/main/tonconnect-manifest.json";
// const manifestUrl = 'https://Blagoi4.github.io/my-twa/tonconnect-manifest.json';
///TESTING MODEL

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TonConnectUIProvider >
    <App />
  </TonConnectUIProvider>
);
