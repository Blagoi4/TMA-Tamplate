import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
// import { useTonConnect } from "./hooks/useTonConnect";
import AccountInfo from "./components/AccountInfo";
import "@twa-dev/sdk";
import { useEffect } from "react";
import useTelegram from "./hooks/useTelegram";
import List from "./components/ListJettons";
import GroupList from "./components/GroupList";
import { useTonConnect } from "./hooks/useTonConnect";

// eslint-disable-next-line @typescript-eslint/no-explicit-any

function App() {
  // const { network } = useTonConnect();
  const { tg, onClose } = useTelegram();
  const { connected } = useTonConnect();
  // const [connected, setConnected] = useState(false)

  useEffect(() => {
    tg.ready();
  }, []);

  console.log(connected);
  return (
    <div className="App">
      <div>
        {/* {network ? (network === CHAIN.MAINNET ? "mainnet" : "testnet") : ""} */}
      </div>
      <div className="Container">
        {!connected ? (
          <TonConnectButton />
        ) : (
          <>
            <TonConnectButton />
            <AccountInfo />
            <GroupList />
            <List />
          </>
        )}

        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default App;
