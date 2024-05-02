import "./App.css";
import { CHAIN, TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "./hooks/useTonConnect";
import AccountInfo from "./components/accountInfo";
import { useCounterContract } from "./hooks/useCounterContract";
import '@twa-dev/sdk'

function App() {
  const { connected, network } = useTonConnect();
  const { sendIncrement } = useCounterContract();

  console.log();
  return (
    <div className="App">
      <div>
        {network ? (network === CHAIN.MAINNET ? "mainnet" : "testnet") : "N/A"}
      </div>
      <div className="Container">
        <TonConnectButton />
        <AccountInfo />

        <a
          className={`Button ${connected ? "Active" : "Disabled"}`}
          onClick={() => {
            sendIncrement();
          }}
        >
          Increment
        </a>
      </div>
    </div>
  );
}

export default App;
