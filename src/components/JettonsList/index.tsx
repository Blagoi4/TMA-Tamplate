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
interface ImageWithFallback {
  src: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
}

const ImageWithFallback: React.FC<ImageWithFallback> = ({
  src,
  width,
  height,
  style,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleError = () => {
    setImageError(true);
  };

  const generateRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  if (imageError) {
    const backgroundColor = generateRandomColor();
    return (
      <div
        style={{
          borderRadius: 16,
          width: width,
          height: height,
          backgroundColor: backgroundColor,
        }}
      ></div>
    );
  }

  return (
    <img
      src={src}
      width={width}
      height={height}
      style={style}
      onError={handleError}
      alt="Product"
    />
  );
};

const JettonList = () => {
  const [open, setOpen] = useState(false);
  const [getJettonBalance, setGetJettonBalance] = useState<JettonBalance[]>([]);
  const { address } = useTonConnect();
  const slicedAddress = useSlicedAddress(address);
  const [loading, setLoading] = useState(false);
  const { tg } = useTelegram();
  const { t } = useTranslation();

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
    const fetchData = async () => {
      const client = tonApiClient();
      if (address !== null) {
        try {
          // await client.accounts.getAccount(address);
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
    fetchData();
    setLoading(false);
  }, []);

  return (
    <div className="overflow-hidden text-tg-text flex flex-col gap-2.5">
      <button
        onClick={handleButton}
        className="py-4 px-16 rounded-2xl text-lg min-w-[350px] border border-gray-300 cursor-pointer whitespace-nowrap"
      >
        {t("Open List Jettons")}
      </button>
      <ul
        className={`${
          open ? "max-h-96 overflow-y-scroll" : "max-h-0"
        } transition-all duration-700 ease-in-out min-w-[350px] flex flex-col gap-4`}
        style={{scrollbarWidth: 'none'}}
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
                    <div className="border-2 border-black p-3.75 rounded-2xl flex items-center justify-between max-w-[350px] p-3">
                      <div className="flex items-center text-start gap-2.5">
                        <ImageWithFallback
                          style={{ borderRadius: 16 }}
                          src={item.jetton.image}
                          width={35}
                          height={35}
                        />
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

export default JettonList;
