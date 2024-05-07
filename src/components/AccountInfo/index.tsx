import "../../App.css";
import { HttpClient, Api } from "tonapi-sdk-js";
import { useEffect, useState } from "react";
import { useTonConnect } from "../../hooks/useTonConnect";
import { useSlicedAddress } from "../../hooks/useSlicedAddress";
import "./ListJettons.css";

const AccountInfo = () => {
  const [balance, setBalance] = useState<null | number>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [getJettonBalance, setGetJettonBalance] = useState<any>([]);
  const { connected, address } = useTonConnect();
  const slicedAddress = useSlicedAddress(address);
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

      const addressBoltJetton =
        "0:f4bdd480fcd79d47dbaf6e037d1229115feb2e7ac0f119e160ebd5d031abdf2e";
      

      const client = new Api(httpClient);
      if (address !== null) {
        try {
          const accountInfo = await client.accounts.getAccount(address);
          const jettonsInfo = await client.accounts.getAccountJettonsBalances(
            address
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
            (el: any) =>
              el.jetton.address === addressBoltJetton && el.balance > 0
          );
          setAvailabilityBolt(availabilityBoltJetton);
        } catch (error) {
          console.error("Error fetching jetton info:", error);
        }
      }
    };

    fetchData();
  }, [address, connected]);

  const listColor: Record<number, string> = {
    1: "rgb(255,50,250)",
    2: "rgb(245,150,245)",
    3: "rgb(200,150,200)",
    4: "rgb(150,0,150)",
    5: "rgb(50,150,50)",
  };

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
                  if (parseFloat(item.balance) / 1000000 >= 0.00001) {
                    return (
                      <div
                        key={`${item.jetton.symbol}-${index}`}
                        className="Jettons-List-Wrappers"
                      >
                        <div className="Jettons-List-Wrappers__info">
                          {item.jetton?.image ? (
                            <div className="Jettons-List-Wrappers__img__wrapper">
                              <picture>
                                {" "}
                                <img
                                  className="Jettons-List-Wrappers__img"
                                  src={item.jetton.image}
                                  onError={() => {
                                    item.jetton.image = !item.jetton.image;
                                  }}
                                  // style={{width:'100%', height: 'auto'}}
                                />
                              </picture>
                            </div>
                          ) : (
                            <div
                              className="Jettons-List-Wrappers__placeholder"
                              style={{
                                backgroundColor: item.jetton?.image
                                  ? ""
                                  : listColor[
                                      (index % Object.keys(listColor).length) +
                                        1
                                    ],
                                borderRadius: "50%",
                              }}
                            />
                          )}

                          <span>{item.jetton.name}</span>
                        </div>

                        <div className="Jettons-List-Wrappers__balance">
                          {(parseFloat(item.balance) / 1000000).toLocaleString(
                            "en-US",
                            {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 5,
                            }
                          )}
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
