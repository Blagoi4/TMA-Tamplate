import "../App.css";
import { HttpClient, Api, Account } from "tonapi-sdk-js";
import { useEffect, useState } from "react";
import { useTonConnect } from "../hooks/useTonConnect";

const AccountInfo = () => {
  const [balance, setBalance] = useState<null | number>(null);
  const [addressWallet, setAddressWallet] = useState<string | null>("");
  const { connected } = useTonConnect();

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

      const address = "UQC27V3iUgelvnGZChU9PV-XUYO6MEo5l5MnPZIn4XoaK0XN";

      try {
        const accountInfo: Account = await client.accounts.getAccount(address);
        setBalance(accountInfo.balance);
        setAddressWallet(accountInfo.address);
      } catch (error) {
        console.error("Error fetching jetton info:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="Card">
        <b>Wallet Address</b>
        <div className="Hint">{connected ? addressWallet : "---"}</div>
      </div>

      <div className="Card">
        <b>Balance</b>
        <div>{connected ? balance : "---"}</div>
      </div>
    </>
  );
};

export default AccountInfo;
