import { useState } from "react";
import "../ListJettons/list.css";
import dataGroupCatalog from "../GroupList/dataGroupCatalog.js";


interface GroupCatalogItem {
  image: string;
  name: string;
  title: string;
  limit: string;
}
const GroupList = () => {
  const [open, setOpen] = useState(false);

  const handleButton = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className="select-wrapper">
      <button onClick={handleButton} className="select-button__group">
        Открыть список чатов
      </button>
      <ul className={open ? "select-list__group__show" : "select-list__group__close"}>
        {dataGroupCatalog.map((item: GroupCatalogItem, index: number) => (
          <li className="list-jettons" key={index}>
            <div className="group-list-wrapper">
              <div className="group-list__info">
                <div className="group-list__img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="group-list__title">
                  <h3>{item.name}</h3>
                  <h6>{item.title}</h6>
                </div>
              </div>
              <div className="group-list__limit">{item.limit}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;
