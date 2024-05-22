import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { Buffer } from 'buffer';
if (typeof window !== 'undefined') {
    window.Buffer = Buffer;
}




const manifestUrl =
  "https://raw.githubusercontent.com/Blagoi4/TWA-Template/main/tonconnect-manifest.json";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>
);
