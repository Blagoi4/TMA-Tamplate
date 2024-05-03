import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

// const manifestUrl = '/tonconnect-manifest.json';
// const manifestUrl = 'https://Blagoi4.github.io/my-twa/tonconnect-manifest.json';
// const manifestUrl =  "https://Blagoi4.github.io/TWA-Template/tonconnect-manifest.json";
const manifestUrl = "https://raw.githubusercontent.com/Blagoi4/TWA-Template/main/tonconnect-manifest.json";
// /TESTING MODEL

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>
);
