import { useEffect, useState } from "react";
import { useTonConnect } from "../../hooks/telegram/useTonConnect";
import tonApiClient from "../../services/tonApiClient";
import { INftItem } from "../../types";
import { useTranslation } from "react-i18next";
import NFTList from "./NFTList";
import Button from "../Button";

const NFT: React.FC = () => {
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
      <Button handleOpenList={handleButton} t={t} name="Open NFT List" />
      <NFTList open={open} getNFTItem={getNFTItem} />
    </div>
  );
};

export default NFT;
