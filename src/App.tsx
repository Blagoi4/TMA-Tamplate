import "./App.css";
import { CHAIN, TonConnectButton } from "@tonconnect/ui-react";
import { useTonConnect } from "./hooks/useTonConnect";
import { useCounterContract } from "./hooks/useCounterContract";
import { HttpClient, Api, Account } from "tonapi-sdk-js";
import { useEffect } from "react";

function App() {
  const { connected, network } = useTonConnect();
  const { value, address, sendIncrement } = useCounterContract();

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
        console.log(accountInfo);
      } catch (error) {
        console.error("Error fetching jetton info:", error);
      }
    };

    fetchData();
  }, []);
  console.log();
  return (
    <div className="App">
      <div>
        {network ? (network === CHAIN.MAINNET ? "mainnet" : "testnet") : "N/A"}
      </div>
      <div className="Container">
        <TonConnectButton />
        <div className="Card">
          <b>Counter Address</b>
          <div className="Hint">{address?.slice(0, 30) + "..."}</div>
        </div>

        <div className="Card">
          <b>Counter Value</b>
          <div>{value ?? "Loading..."}</div>
        </div>

        <a
          className={`Button ${connected ? "Active" : "Disabled"}`}
          onClick={() => {
            sendIncrement();
          }}
        >
          Increment
        </a>
      </div>
    </div>
  );
}

export default App;
