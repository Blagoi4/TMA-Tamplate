import { useEffect, useState } from "react";
import { useSlicedAddress } from "../../../hooks/telegram/useSlicedAddress";
import useTelegram from "../../../hooks/telegram/useTelegram";
import tonApiClient from "../../../services/tonApiClient";
import { JettonData } from "../../../types/jetton";


const JettonData = (address: string | null) => {
  const [loading, setLoading] = useState(false);
  const [getJetton, setGetJetton] = useState<JettonData[]>([]);
  const { tg } = useTelegram();
  const slicedAddress = useSlicedAddress(address);

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
    const fetchData = async () => {
      const client = tonApiClient();
      if (address !== null) {
        try {
          const jettonInfo = await client.accounts.getAccountJettonsBalances(
            address
          );
          if (
            jettonInfo &&
            jettonInfo.balances &&
            jettonInfo.balances.length > 0
          ) {
            const jettonData = jettonInfo.balances.sort(
              (a, b) => parseFloat(b.balance) - parseFloat(a.balance)
            );
            setGetJetton(jettonData as unknown as JettonData[]);
            setLoading(true);
          }
        } catch (error) {
          console.error("Error fetching jetton info:", error);
        }
      }
    };
    fetchData();
    setLoading(false);
  }, [address, slicedAddress, tg]);

  return { loading, getJetton };
};

export default JettonData;
