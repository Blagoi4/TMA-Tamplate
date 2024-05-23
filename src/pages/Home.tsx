import { TonConnectButton } from "@tonconnect/ui-react";
import AccountInfo from "../components/AccountInfo";
import "@twa-dev/sdk";
import { useEffect } from "react";
import useTelegram from "../hooks/useTelegram";
import List from "../components/ListJettons";
import GroupList from "../components/GroupList";
import { useTonConnect } from "../hooks/useTonConnect";
import SettingsButton from "../components/SettingsButton";
import "../index.css"; 
import { useTranslation } from "react-i18next";

const Home = () => {
  const { tg, onClose } = useTelegram();
  const { connected } = useTonConnect();
  const { t } = useTranslation();



  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <div className="h-screen relative  text-tg-text bg-tg-bg-secondary">
      <div className="p-5 flex flex-col gap-5 items-center text-center mx-auto relative z-10">
        {!connected ? (
          <TonConnectButton  />
        ) : (
          <>
            <div className="w-full flex items-center justify-between">
              <SettingsButton />
              {}
            </div>
            <div className="flex flex-col items-center gap-5">
              <TonConnectButton />
              <AccountInfo />
              <GroupList />
              <List />
            </div>
          </>
        )}
        <button
          className="flex p-2.5 rounded-lg border border-black text-lg"
          onClick={onClose}
        >
          {t('close')}
        </button>
      </div>
    </div>
  );
};

export default Home;