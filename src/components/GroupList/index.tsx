import { useState } from "react";
import "./grouplist.css";
// import '../ListJettons/list.css'

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
      <ul
        className={
          open ? "select-list__group__show" : "select-list__group__close"
        }
      >
        <li className="list-jettons">
          <div className="group-list-wrapper">
            <div className="group-list__info">
              <div className="group-list__img">
                <img
                  src="https://cdn.iconscout.com/icon/premium/png-512-thumb/webp-11558414-9400619.png?f=webp&w=256"
                  alt=""
                />
              </div>
              <div className="group-list__title">
                <h3>Rulers</h3>
                <h6>only 1 left in stock</h6>
              </div>
            </div>
            <div className="group-list__limit">8-16</div>
          </div>
          <div className="group-list-wrapper">
            <div className="group-list__info">
              <div className="group-list__img">
                <img
                  src="https://cdn.iconscout.com/icon/premium/png-512-thumb/webp-11558414-9400619.png?f=webp&w=256"
                  alt=""
                />
              </div>
              <div className="group-list__title">
                <h3>Rulers</h3>
                <h6>only 1 left in stock</h6>
              </div>
            </div>
            <div className="group-list__limit">8-16</div>
          </div>
          <div className="group-list-wrapper">
            <div className="group-list__info">
              <div className="group-list__img">
                <img
                  src="https://cdn.iconscout.com/icon/premium/png-512-thumb/webp-11558414-9400619.png?f=webp&w=256"
                  alt=""
                />
              </div>
              <div className="group-list__title">
                <h3>Rulers</h3>
                <h6>only 1 left in stock</h6>
              </div>
            </div>
            <div className="group-list__limit">8-16</div>
          </div>
          <div className="group-list-wrapper">
            <div className="group-list__info">
              <div className="group-list__img">
                <img
                  src="https://cdn.iconscout.com/icon/premium/png-512-thumb/webp-11558414-9400619.png?f=webp&w=256"
                  alt=""
                />
              </div>
              <div className="group-list__title">
                <h3>Rulers</h3>
                <h6>only 1 left in stock</h6>
              </div>
            </div>
            <div className="group-list__limit">8-16</div>
          </div>
          <div className="group-list-wrapper">
            <div className="group-list__info">
              <div className="group-list__img">
                <img
                  src="https://cdn.iconscout.com/icon/premium/png-512-thumb/webp-11558414-9400619.png?f=webp&w=256"
                  alt=""
                />
              </div>
              <div className="group-list__title">
                <h3>Rulers</h3>
                <h6>only 1 left in stock</h6>
              </div>
            </div>
            <div className="group-list__limit">8-16</div>
          </div>
          <div className="group-list-wrapper">
            <div className="group-list__info">
              <div className="group-list__img">
                <img
                  src="https://cdn.iconscout.com/icon/premium/png-512-thumb/webp-11558414-9400619.png?f=webp&w=256"
                  alt=""
                />
              </div>
              <div className="group-list__title">
                <h3>Rulers</h3>
                <h6>only 1 left in stock</h6>
              </div>
            </div>
            <div className="group-list__limit">8-16</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default GroupList;
