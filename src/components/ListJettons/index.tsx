import { useEffect, useState } from "react";
import { useTonConnect } from "../../hooks/useTonConnect";
import { useSlicedAddress } from "../../hooks/useSlicedAddress";
import useTelegram from "../../hooks/useTelegram";
import tonApiClient from "../../services/tonApiClient";
import { useTranslation } from "react-i18next";

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
  const {t} = useTranslation()

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
    <div className="overflow-hidden text-tg-text flex flex-col gap-2.5">
      <button
        onClick={handleButton}
        className="py-4 px-16 rounded-2xl text-lg min-w-[350px] border border-gray-300 cursor-pointer whitespace-nowrap"
      >
        {t('Open List Jettons')}
        
      </button>
      <ul
        className={`${
          open ? "max-h-96 overflow-y-scroll" : "max-h-0"
        } transition-all duration-700 ease-in-out min-w-[350px] flex flex-col gap-4`}
      >
        {loading
          ? getJettonBalance.map((item, index) => {
              const balance =
                parseFloat(item.balance) / Math.pow(10, item.jetton.decimals);
              if (balance >= 0.001) {
                return (
                  <li
                    key={`${item.jetton.symbol}-${index}`}
                    className="flex flex-col gap-2.5 p-1.25"
                  >
                    <div className="border border-black p-3.75 rounded-2xl flex items-center justify-between max-w-[350px] p-3">
                      <div className="flex items-center text-start gap-2.5">
                        {item.jetton?.image ? (
                          <div className="flex items-center justify-center">
                            <div className="w-10 h-10 overflow-hidden rounded-full">
                              <img
                                className="w-full h-full object-cover"
                                src={item.jetton.image}
                                onError={() => {
                                  item.jetton.image = "";
                                }}
                              />
                            </div>
                          </div>
                        ) : (
                          <div
                            className="w-10 h-10 rounded-full"
                            style={{
                              backgroundColor:
                                listColor[
                                  (index % Object.keys(listColor).length) + 1
                                ],
                            }}
                          />
                        )}
                        <div className="flex-2 flex flex-col p-1.25">
                          {item.jetton.name}
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <div className="text-base">
                          {balance.toLocaleString("ru-RU", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }
              return null;
            })
          : "Loading..."}
      </ul>
    </div>
  );
};

export default List;
