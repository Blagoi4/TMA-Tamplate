import "./App.css";
import { CHAIN, TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "./hooks/useTonConnect";
import AccountInfo from "./components/AccountInfo";
import "@twa-dev/sdk";
import { useEffect } from "react";
import useTelegram from "./hooks/useTelegram";

// eslint-disable-next-line @typescript-eslint/no-explicit-any

function App() {
  const { network } = useTonConnect();
  const { tg, onClose } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, []);

  return (
    <div className="App">
      <div>
        {network ? (network === CHAIN.MAINNET ? "mainnet" : "testnet") : ""}
      </div>
      <div className="Container">
        <TonConnectButton />
        <AccountInfo />

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default App;
