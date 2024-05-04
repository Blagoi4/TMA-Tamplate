import "../../App.css";
import { HttpClient, Api } from "tonapi-sdk-js";
import { useEffect, useState } from "react";
import { useTonConnect } from "../../hooks/useTonConnect";
import { useSlicedAddress } from "../../hooks/useSlicedAddress";
import { CHAIN } from "@tonconnect/ui-react";
import "./ListJettons.css";

const AccountInfo = () => {
  const [balance, setBalance] = useState<null | number>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [getJettonBalance, setGetJettonBalance] = useState<any>([]);
  const { connected, address } = useTonConnect();
  const slicedAddress = useSlicedAddress(address, CHAIN.TESTNET);
  const [loading, setLoading] = useState(false);
  const [availabilityBolt, setAvailabilityBolt] = useState([]);

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

      const testAddress = "UQBxLLK2E-3q_Kyee3mxiOPTh-ohxBXW5OTAz7_6arcDHYMg";

      const client = new Api(httpClient);

      if (address !== null) {
        try {
          const accountInfo = await client.accounts.getAccount(testAddress);
          const jettonsInfo = await client.accounts.getAccountJettonsBalances(
            testAddress
          );
          const balanceAccount = accountInfo.balance / Math.pow(10, 9);
          setBalance(balanceAccount);

          const sortingBalanceJettons = jettonsInfo.balances.sort(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (a: any, b: any) => b.balance - a.balance
          );
          setGetJettonBalance(sortingBalanceJettons);
          setLoading(true);
          const availabilityBoltJetton = getJettonBalance.filter(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (el: any) => el.jetton.symbol === "BOLT" && el.balance > 0
          );
          setAvailabilityBolt(availabilityBoltJetton);
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
        {availabilityBolt.length ? <span>&#127942;</span> : ""}
        <div className="Hint">{connected ? slicedAddress : "---"}</div>
      </div>

      <div className="Card">
        <b>Balance</b>
        <div>{connected ? balance : "---"}</div>
      </div>

      <div className="Card">
        <b></b>
        <div>
          <ul>
            {loading
              ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                getJettonBalance.map((item: any, index: number) => {
                  if (item.balance > 0 && item.jetton) {
                    return (
                      <div
                        key={`${item.jetton.symbol}-${index}`}
                        className="Jettons-List-Wrappers"
                      >
                        <div className="Jettons-List-Wrappers__info">
                          <img
                            className="Jettons-List-Wrappers__img"
                            src={item.jetton.image}
                            height="40px"
                            width="45px"
                            alt=""
                          />
                          <span>{item.jetton.name}</span>
                        </div>
                        <div className="Jettons-List-Wrappers__balance">
                          {(
                            parseFloat(item.balance) / 1000000000
                          ).toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 5,
                          })}
                          <span className="Jettons-List-Wrappers__jettons_name">
                            {item.jetton.symbol}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })
              : "Loading..."}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AccountInfo;
