import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../Button";
import JettonList from "./JettonList";
import { useTonConnect } from "../../hooks/telegram/useTonConnect";
import useJettonData from "./JettonData";

const Jetton = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { address } = useTonConnect();
  const { loading, getJetton } = useJettonData(address);

  const handleButton = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className="overflow-hidden text-tg-text flex flex-col gap-2.5">
      <Button t={t} handleOpenList={handleButton} name={"Open Jetton List"} />
      <JettonList loading={loading} getJetton={getJetton} open={open} />
    </div>
  );
};

export default Jetton;
