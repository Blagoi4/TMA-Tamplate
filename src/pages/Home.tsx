import { TonConnectButton } from "@tonconnect/ui-react";
import AccountInfo from "../components/AccountInfo";
import "@twa-dev/sdk";
import { useEffect } from "react";
import useTelegram from "../hooks/telegram/useTelegram";
import { useTonConnect } from "../hooks/telegram/useTonConnect";
import SettingsButton from "../components/UI/SettingsButton";
import "../index.css";
import NFT from "../components/NFT";
import Group from "../components/Group";
import Jetton from "../components/JettonsList";

const Home = () => {
  const { tg } = useTelegram();
  const { connected } = useTonConnect();

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className="bg-tg-bg-theme h-screen relative text-tg-text">
      <div className="p-5 flex flex-col gap-5 items-center text-center mx-auto relative z-10">
        {!connected ? (
          <TonConnectButton className="mainBTN" />
        ) : (
          <>
            <div className="w-full flex items-center justify-between">
              <SettingsButton />
            </div>
            <div className="flex flex-col items-center gap-5">
              <div className="font-light flex-col">
                <h1 className="font-bold text-3xl">Welcome Bolt Foundation</h1>
                <h6 className="font-light text-sm text-tg-subtitle">
                  subheading text company
                </h6>
              </div>
              {/* <TonConnectButton /> */}
              <AccountInfo />
              <Group />
              <Jetton />
              <NFT />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
