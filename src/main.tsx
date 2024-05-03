import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

// const manifestUrl = '/public/tonconnect-manifest.json';
// const manifestUrl = 'https://Blagoi4.github.io/my-twa/tonconnect-manifest.json';
const manifestUrl =  "https://Blagoi4.github.io/TWA-Template/tonconnect-manifest.json";
///TESTING MODEL

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>
);
