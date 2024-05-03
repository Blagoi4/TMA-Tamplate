import "../../App.css";
import { HttpClient, Api } from "tonapi-sdk-js";
import { useEffect, useState } from "react";
import { useTonConnect } from "../../hooks/useTonConnect";
import { useSlicedAddress } from "../../hooks/useSlicedAddress";
import { CHAIN } from "@tonconnect/ui-react";

const AccountInfo = () => {
  const [balance, setBalance] = useState<null | number>(null);
  const [getJettonBalance, setGetJettonBalance] = useState<null | number>(null);
  const { connected, address } = useTonConnect();
  const slicedAddress = useSlicedAddress(address, CHAIN.TESTNET);

  useEffect(() => {
    const fetchData = async () => {
      const token =
        "AFFOSTQDZOETPHQAAAAJUQPLAAXFLUJ6KZA7GZHFOYCADVDZ5FRTXO35LCI3DZFDACDB4ZA";

      const httpClient = new HttpClient({
        baseUrl: "https://tonapi.io",
        baseApiParams: {
          headers: {
            "content-length": "104",
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=utf-8",
          },
        },
      });

      const client = new Api(httpClient);

      if (address !== null) {
        try {
          const accountInfo = await client.accounts.getAccount(address);
          const jettonsInfo = await client.accounts.getAccountJettonsBalances(
            address
          );
          const balanceAccount = accountInfo.balance / Math.pow(10, 9);
          const balanceJettons = jettonsInfo.balances;
          setBalance(balanceAccount);
          setGetJettonBalance(Number(balanceJettons));
        } catch (error) {
          console.error("Error fetching jetton info:", error);
        }
      }
    };

    fetchData();
  }, [address, connected]);

  return (
    <>
      <div className="Card">
        <b>Wallet Address</b>
        <div className="Hint">{connected ? slicedAddress : "---"}</div>
      </div>

      <div className="Card">
        <b>Balance</b>
        <div>{connected ? balance : "---"}</div>
      </div>
      <div className="Card">
        <b>Balance Jettons</b>
        <div>{getJettonBalance}</div>
      </div>
    </>
  );
};

export default AccountInfo;
