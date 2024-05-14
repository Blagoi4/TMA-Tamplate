// import React, { useEffect } from 'react';
import "./list.css";
// import "../../App.css";
import { HttpClient, Api } from "tonapi-sdk-js";
import { useEffect, useState } from "react";
import { useTonConnect } from "../../hooks/useTonConnect";
import { useSlicedAddress } from "../../hooks/useSlicedAddress";
import "../AccountInfo/accountInfo.css";
import useTelegram from "../../hooks/useTelegram";

const List = () => {
  const [open, setOpen] = useState(false);
  //   const [balance, setBalance] = useState<null | number>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [getJettonBalance, setGetJettonBalance] = useState<any>([]);
  const { connected, address } = useTonConnect();
  const slicedAddress = useSlicedAddress(address);
  const [loading, setLoading] = useState(false);
  //   const [availabilityBolt, setAvailabilityBolt] = useState([]);
  const { tg } = useTelegram();

  const handleButton = () => {
    setOpen((prevState) => !prevState);
  };

  //   //////////////////////////////////////////////

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
  }, [connected, address, tg, address]);

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

    // const addressBoltJetton =
    //   "0:f4bdd480fcd79d47dbaf6e037d1229115feb2e7ac0f119e160ebd5d031abdf2e";

    const client = new Api(httpClient);
    if (address !== null) {
      try {
        await client.accounts.getAccount(address);
        const jettonsInfo = await client.accounts.getAccountJettonsBalances(
          address
        );
        // const balanceAccount = accountInfo.balance / Math.pow(10, 9);
        // setBalance(balanceAccount);
        const sortingBalanceJettons = jettonsInfo.balances.sort(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (a: any, b: any) => b.balance - a.balance
        );
        setGetJettonBalance(sortingBalanceJettons);
        setLoading(true);
        // const availabilityBoltJetton = getJettonBalance.filter(
        //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //   (el: any) => el.jetton.address === addressBoltJetton && el.balance > 0
        // );

        // setAvailabilityBolt(availabilityBoltJetton);
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

  // //////////////////////////////////////////////////////

  return (
    <div className="select">
      <div className="select-wrapper">
        <button onClick={handleButton} className="select-button">
          Открыть список жеттонов
        </button>
        <ul className={open ? "select-list__show" : "select-list__close"}>
          <li className="list-jettons">
            {loading
              ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                getJettonBalance.map((item: any, index: number) => {
                  if (parseFloat(item.balance) / 1000000000 >= 0.00001) {
                    return (
                      <div
                        key={`${item.jetton.symbol}-${index}`}
                        className="Jettons-List-Wrappers"
                      >
                        <div className="Jettons-List-Wrappers__info ">
                          {item.jetton?.image ? (
                            <div className="Jettons-List-Wrappers__img__wrapper">
                             <div className="icons">
                              <img
                                className="Jettons-List-Wrappers__img"
                                src={item.jetton.image}
                                onError={() => {
                                  item.jetton.image = !item.jetton.image;
                                }}
                              />
                              </div> 
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
                            {(
                              parseFloat(item.balance) / 1000000000
                            ).toLocaleString("en-US", {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 3,
                            })}
                          </div>
                          <div className="jettons-list__symbol">
                            {item.jetton.symbol}
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
