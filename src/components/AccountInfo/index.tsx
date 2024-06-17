import { useEffect, useState } from "react";
import { useTonConnect } from "../../hooks/telegram/useTonConnect";
import { useSlicedAddress } from "../../hooks/telegram/useSlicedAddress";
import useTelegram from "../../hooks/telegram/useTelegram";
import tonApiClient from "../../services/tonApiClient";
import { useTranslation } from "react-i18next";
import BoltLogo from "../UI/BoltLogo";

const AccountInfo = () => {
  const { connected, address } = useTonConnect();
  const slicedAddress = useSlicedAddress(address);
  const [balanceBolt, setBalanceBolt] = useState<number | string>("");
  const { tg } = useTelegram();
  const { t } = useTranslation();

  useEffect(() => {
    if (tg && slicedAddress) {
      const message = {
        message: String(slicedAddress),
      };
      if (slicedAddress.trim() !== "") {
        tg.sendData(JSON.stringify(message));
      } else {
        console.log("Skipped sending data, address is empty");
      }
    }
    fetchData();
  }, [connected, address]);

  const fetchData = async () => {
    const addressBoltJetton =
      "0:f4bdd480fcd79d47dbaf6e037d1229115feb2e7ac0f119e160ebd5d031abdf2e";

    const client = tonApiClient();
    if (address !== null) {
      try {
        const jettonsInfo = await client.accounts.getAccountJettonsBalances(
          address
        );

        jettonsInfo.balances.forEach((item) => {
          if (
            item.jetton.address === addressBoltJetton &&
            Number(item.balance) > 0
          ) {
            setBalanceBolt(
              (Number(item.balance) / 1000000000).toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
            );
          } else {
            ("");
          }
        });
      } catch (error) {
        console.error("Error fetching jetton info:", error);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 ">
      <span className="text-lg">{t("Balance")}</span>
      <div className="flex items-center gap-2.5">
        <div className="text-4xl">{balanceBolt}</div>
        <div>
          <BoltLogo />
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
