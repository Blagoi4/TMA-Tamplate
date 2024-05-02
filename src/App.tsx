import "./App.css";
import { CHAIN, TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "./hooks/useTonConnect";
import { useCounterContract } from "./hooks/useCounterContract";

import "@twa-dev/sdk";
import AccountInfo from "./components/accountInfo";

function App() {
  const { connected, network } = useTonConnect();
  const { value, address, sendIncrement } = useCounterContract();
  // const [balance, setBalance] = useState(0)

  return (
    <div className="App">
      <div className="network">
        {network ? (network === CHAIN.MAINNET ? "mainnet" : "testnet") : "N/A"}
      </div>
      <div className="Container">
        <TonConnectButton />

        {connected ? <AccountInfo />: 'IIIIIII'}

        <a
          className={`Button ${connected ? "Active" : "Disabled"}`}
          onClick={() => {
            sendIncrement();
          }}
        >
          Increment
        </a>
      </div>
      {/* <AccountInfo/> */}
    </div>
  );
}

export default App;
