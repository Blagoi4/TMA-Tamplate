import "../index.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import AccountInfo from "../components/AccountInfo";
import "@twa-dev/sdk";
import { useEffect } from "react";
import useTelegram from "../hooks/useTelegram";
import List from "../components/ListJettons";
import GroupList from "../components/GroupList";
import { useTonConnect } from "../hooks/useTonConnect";
import SettingsButton from "../components/SettingsButton";
import QRScanner from "../components/QRScanner";
// import { Link } from "react-router-dom";

const Home = () => {
  const { tg, onClose } = useTelegram();
  const { connected } = useTonConnect();
  // const { backButton } = useTelegram();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className="App">
      <div className="Container">
        {!connected ? (
          <TonConnectButton />
        ) : (
          <>
            <div className="account-controls-wrapper">
              <SettingsButton />
              <QRScanner />
            </div>
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
};

export default Home;
