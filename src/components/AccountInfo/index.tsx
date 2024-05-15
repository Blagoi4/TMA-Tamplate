import "../../App.css";
import { useEffect, useState } from "react";
import { useTonConnect } from "../../hooks/useTonConnect";
import { useSlicedAddress } from "../../hooks/useSlicedAddress";
import "./accountInfo.css";
import useTelegram from "../../hooks/useTelegram";
import tonApiClient from "../../services/tonApiClient";

const AccountInfo = () => {
  const { connected, address } = useTonConnect();
  const slicedAddress = useSlicedAddress(address);
  const [balanceBolt, setBalanceBolt] = useState<number | string>("");
  const [imageBolt, setImageBolt] = useState("");
  const { tg } = useTelegram();

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
            setImageBolt(item.jetton.image);
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
    <>
      <div className="Balance-Bolt-Wrapper">
        <span className="balance-bolt__title">Balance</span>
        <div className="Balance-Bolt__info">
          <div className="Balance-Bolt__info__sum">{balanceBolt}</div>
          <img src={imageBolt} alt="" />
        </div>
      </div>
    </>
  );
};


export default AccountInfo;
