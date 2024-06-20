import { JettonListProps } from "../../../types/jetton";
import ImageWithFallback from "../../ImageWithFallback/index";

const JettonList: React.FC<JettonListProps> = ({
  loading,
  getJetton,
  open,
}) => {
  return (
    <ul
      className={`${
        open ? "max-h-96 overflow-y-scroll" : "max-h-0"
      } transition-all duration-700 ease-in-out min-w-[350px] flex flex-col gap-4`}
      style={{ scrollbarWidth: "none" }}
    >
      {loading
        ? getJetton.map((item, index) => {
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
                      imageError={item.jetton.imageError}
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
  );
};

export default JettonList;
