import { useEffect, useState } from "react";
import dataGroupCatalog from "../GroupList/dataGroupCatalog.js";
import { useTranslation } from "react-i18next";
import FillterIcon from "../UI/FillterIcon/index.js";
import FillterResetIcon from "../UI/FillterResetIcon/index.js";

interface GroupCatalogItem {
  image: string;
  name: string;
  title: string;
  limit: string;
  favorite?: boolean;
  id: number;
  join: boolean;
}

const GroupList = () => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [groups, setGroups] = useState<GroupCatalogItem[]>([]);
  const [initialGroup, setInitialGroup] = useState<GroupCatalogItem[]>([]);
  const [isAlphabetSorted, setIsAlphabetSorted] = useState(false);
  const [isJoinInGroup, setIsJoinInGroup] = useState(false);
  const [IncreaseAndDecrease, setIncreaseAndDecrease] = useState(false);
  const { t } = useTranslation();

  const handleButton = () => {
    setOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const favoriteGroup = dataGroupCatalog.filter((el) => el.favorite);
    const unFavoriteGroup = dataGroupCatalog.filter((el) => !el.favorite);
    const initial = [...favoriteGroup, ...unFavoriteGroup];
    setGroups(initial);
    setInitialGroup(initial);
  }, []);

  const handleToggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleAlphabet = () => {
    setIsAlphabetSorted((prevState) => !prevState);

    const sortedFavorite = initialGroup
      .filter((el) => el.favorite)
      .sort((a, b) =>
        isAlphabetSorted
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title)
      );

    const sortedNotFavorite = initialGroup
      .filter((el) => !el.favorite)
      .sort((a, b) =>
        isAlphabetSorted
          ? b.title.localeCompare(a.title)
          : a.title.localeCompare(b.title)
      );

    setGroups([...sortedFavorite, ...sortedNotFavorite]);
  };

  const handleJoinInGroup = () => {
    setIsJoinInGroup((prevState) => !prevState);

    const sortedFavoriteJoin = initialGroup
      .filter((el) => el.favorite)
      .sort((a, b) => (isJoinInGroup ? (a.join ? -1 : 1) : b.join ? 1 : -1));

    const sortedNotFavoriteJoin = initialGroup
      .filter((el) => !el.favorite)
      .sort((a, b) => (isJoinInGroup ? (a.join ? -1 : 1) : b.join ? 1 : -1));

    const sortedGroups = [...sortedFavoriteJoin, ...sortedNotFavoriteJoin];
    setGroups(sortedGroups);
  };

  const handleIncreaseAndDecrease = () => {
    setIncreaseAndDecrease((prevState) => !prevState);

    const sortedFavoriteIncrease = initialGroup
      .filter((el) => el.favorite)
      .sort((a, b) =>
        IncreaseAndDecrease
          ? a.limit.localeCompare(b.limit)
          : b.limit.localeCompare(a.limit)
      );

    const sortedNotFavoriteIncrease = initialGroup
      .filter((el) => !el.favorite)
      .sort((a, b) =>
        IncreaseAndDecrease
          ? a.limit.localeCompare(b.limit)
          : b.limit.localeCompare(a.limit)
      );

    const sortedGroups = [
      ...sortedFavoriteIncrease,
      ...sortedNotFavoriteIncrease,
    ];
    setGroups(sortedGroups);
  };

  const resetFillter = () => {
    setGroups(initialGroup);
    setIsAlphabetSorted(false);
    setIsJoinInGroup(false);
    setIncreaseAndDecrease(false);
  };

  console.log(isJoinInGroup);
  console.log(groups);
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
        {t("Open List Chat")}
      </button>
      <ul
        className={`${
          open ? "max-h-96 overflow-y-auto" : "max-h-0"
        } transition-all duration-700  ease-in-out min-w-[350px] flex flex-col gap-4`}
        style={{ scrollbarWidth: "none" }}
      >
        <div className="relative">
          <div className=" flex justify-end" onClick={handleToggleMenu}>
            <div className="flex items-center">
              <FillterIcon />
            </div>
          </div>
          {isOpen && (
            <div className="items-center right-0 mt-1 p-1 dark:bg-tg-bg-theme  border-gray-300 shadow-md rounded flex justify-around">
              <div
                onClick={handleAlphabet}
                className={
                  isAlphabetSorted
                    ? "p-2 border-2 text-xs rounded-m bg-tg-bg-theme border-green-300"
                    : "p-2 border-2 text-xs rounded-m bg-tg-bg-theme"
                }
              >
                Alphabet
              </div>
              <div
                onClick={handleJoinInGroup}
                className={
                  isJoinInGroup
                    ? "p-2 border-2 text-xs rounded-m bg-tg-bg-theme border-green-300"
                    : "p-2 border-2 text-xs rounded-m bg-tg-bg-theme"
                }
              >
                Join in Group
              </div>
              <div
                onClick={handleIncreaseAndDecrease}
                className={
                  IncreaseAndDecrease
                    ? "p-2 border-2 text-xs rounded-m bg-tg-bg-theme border-green-300"
                    : "p-2 border-2 text-xs rounded-m bg-tg-bg-theme"
                }
              >
                <span>ASC </span>/<span> DESC</span>
              </div>
              <div onClick={resetFillter}>
                <FillterResetIcon />
              </div>
            </div>
          )}
        </div>

        {groups.map((item: GroupCatalogItem) => (
          <li className="flex flex-col gap-2.5 p-1.25" key={item.id}>
            <div
              className={
                item?.favorite
                  ? "border-2 border-yellow-500 shadow-gold border- p-3.75 rounded-2xl flex items-center justify-between max-w-[350px] p-3"
                  : "border-2 border-black p-3.75 rounded-2xl flex items-center justify-between max-w-[350px] p-3"
              }
            >
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
