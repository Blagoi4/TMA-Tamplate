import { useEffect, useState } from "react";
import { useTonConnect } from "../../hooks/useTonConnect";
import tonApiClient from "../../services/tonApiClient";
import { INftItem } from "../../types";
import { useTranslation } from "react-i18next";

const NFTList: React.FC = () => {
  const { address } = useTonConnect();
  const [getNFTItem, setGetNFTItem] = useState<INftItem[]>([]);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleButton = () => {
    setOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      const client = tonApiClient();
      if (address !== null) {
        try {
          const nftItems = await client.accounts.getAccountNftItems(address);
          setGetNFTItem(nftItems.nft_items as INftItem[]);
        } catch (error) {
          console.error("Error fetching jetton info:", error);
        }
      }
    };
    fetchData();
  }, [address]);

  return (
    <div className="overflow-hidden text-tg-text flex flex-col gap-2.5">
      <button
        onClick={handleButton}
        className="py-4 px-16 rounded-2xl text-lg min-w-[350px] border border-gray-300 cursor-pointer whitespace-nowrap"
      >
        {t("Open NFT Collection")}
      </button>
      <ul
        className={`${
          open ? "max-h-96 overflow-y-scroll" : "max-h-0"
        } transition-all duration-700 ease-in-out min-w-[350px] flex flex-col gap-4`}
        style={{ scrollbarWidth: "none" }}
      >
        {getNFTItem.map((item) => (
          <li className="flex flex-col gap-2.5 p-1.25" key={item.address}>
            <div className="border-2 border-black p-3.75 rounded-2xl flex items-center justify-between max-w-[350px] p-3">
              <div className="flex items-center text-start gap-2.5">
                <div className="flex items-center justify-center">
                  <img
                    src={item.previews[1]?.url || ""}
                    alt={item.metadata.name || "NFT Image"}
                    className="w-10 h-10 rounded-2xl"
                  />
                </div>
                <div className="flex-2 flex flex-col p-1.25">
                  <h3>{item.collection?.name || "No Collection"}</h3>
                  <h6 className="text-xs">
                    {item.title || item.metadata.name}
                  </h6>
                </div>
              </div>
              <div className="flex justify-center items-center">{}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NFTList;
