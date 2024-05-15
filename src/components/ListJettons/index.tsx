import "./list.css";
// import { HttpClient, Api } from "tonapi-sdk-js";
import { useEffect, useState } from "react";
import { useTonConnect } from "../../hooks/useTonConnect";
import { useSlicedAddress } from "../../hooks/useSlicedAddress";
import "../AccountInfo/accountInfo.css";
import useTelegram from "../../hooks/useTelegram";
import tonApiClient from "../../services/tonApiClient";

interface Jetton {
  symbol: string;
  name: string;
  image: string;
  decimals: number;
}

interface JettonBalance {
  balance: string;
  jetton: Jetton;
}

const List = () => {
  const [open, setOpen] = useState(false);
  const [getJettonBalance, setGetJettonBalance] = useState<JettonBalance[]>([]);
  const { connected, address } = useTonConnect();
  const slicedAddress = useSlicedAddress(address);
  const [loading, setLoading] = useState(false);
  const { tg } = useTelegram();

  const handleButton = () => {
    setOpen((prevState) => !prevState);
  };

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
  }, [connected, address, tg, slicedAddress]);

  const fetchData = async () => {
  

    const client = tonApiClient();
    if (address !== null) {
      try {
        await client.accounts.getAccount(address);
        const jettonsInfo = await client.accounts.getAccountJettonsBalances(
          address
        );
        console.log(jettonsInfo)
        const sortingBalanceJettons = jettonsInfo.balances.sort(
          (a, b) => parseFloat(b.balance) - parseFloat(a.balance)
        );
        setGetJettonBalance(sortingBalanceJettons);
        setLoading(true);
      } catch (error) {
        console.error("Error fetching jetton info:", error);
      }
    }
  };

  const listColor: Record<number, string> = {
    1: "rgb(255,50,250)",
    2: "rgb(245,150,245)",
    3: "rgb(200,150,200)",
    4: "rgb(150,0,150)",
    5: "rgb(50,150,50)",
  };

  return (
    <div className="select">
      <div className="select-wrapper">
        <button onClick={handleButton} className="select-button">
          Открыть список жеттонов
        </button>
        <ul className={open ? "select-list__show" : "select-list__close"}>
          <li className="list-jettons">
            {loading
              ? getJettonBalance.map((item, index) => {
                  const balance = parseFloat(item.balance) / Math.pow(10, item.jetton.decimals);
                  if (balance >= 0.001) {
                    return (
                      <div
                        key={`${item.jetton.symbol}-${index}`}
                        className="Jettons-List-Wrappers"
                      >
                        <div className="Jettons-List-Wrappers__info">
                          {item.jetton?.image ? (
                            <div className="Jettons-List-Wrappers__img__wrapper">
                              <div className="icons">
                                <img
                                  className="Jettons-List-Wrappers__img"
                                  src={item.jetton.image}
                                  onError={() => {
                                    item.jetton.image = "";
                                  }}
                                />
                              </div>
                            </div>
                          ) : (
                            <div
                              className="Jettons-List-Wrappers__placeholder"
                              style={{
                                backgroundColor: listColor[
                                  (index % Object.keys(listColor).length) + 1
                                ],
                                borderRadius: "50%",
                                width: "40px",
                                height: "40px",
                              }}
                            />
                          )}
                          <div className="jettons-list__name">
                            {item.jetton.name}
                          </div>
                        </div>
                        <div className="Jettons-List-Wrappers__balance">
                          <div className="jettons-list__balance">
                            {balance.toLocaleString("ru-RU", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })
              : "Loading..."}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default List;
