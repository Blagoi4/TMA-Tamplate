import { useState } from "react";
import dataGroupCatalog from "../GroupList/dataGroupCatalog.js";
import { useTranslation } from "react-i18next";

interface GroupCatalogItem {
  image: string;
  name: string;
  title: string;
  limit: string;
}

const GroupList = () => {
  const [open, setOpen] = useState(false);
  const {t} = useTranslation()

  const handleButton = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className="overflow-hidden text-tg-text flex flex-col gap-2.5">
      <button
        onClick={handleButton}
        className="py-4 px-16 rounded-2xl text-lg min-w-[350px] border border-gray-300 cursor-pointer whitespace-nowrap"
        style={{
          backgroundColor: "var(--tg-theme-button-color)",
          color: "var(--tg-theme-button-text-color)",
        }}
      >
      
        {t('Open List Chat')}
      </button>
      <ul
        className={`${
          open ? "max-h-96 overflow-y-visible" : "max-h-0"
        } transition-all duration-700 ease-in-out min-w-[350px] flex flex-col gap-4`}
      >
        {dataGroupCatalog.map((item: GroupCatalogItem, index: number) => (
          <li className="flex flex-col gap-2.5 p-1.25" key={index}>
            <div className="border border-black p-3.75 rounded-2xl flex items-center justify-between max-w-[350px] p-3">
              <div className="flex items-center text-start gap-2.5">
                <div className="flex items-center justify-center">
                  <img 
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-2xl"
                  />
                </div>
                <div className="flex-2 flex flex-col p-1.25">
                  <h3>{item.name}</h3>
                  <h6 className="text-xs">{item.title}</h6>
                </div>
              </div>
              <div className="flex justify-center items-center">
                {item.limit}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;