import FilterIcon from "../../UI/FilterIcon/index";
import FilterResetIcon from "../../UI/FilterResetIcon/index";
import ArrowTopIcon from "../../UI/ArrowTop";
import ArrowBottomIcon from "../../UI/ArrowBottom";
import { GroupListProps } from "../GroupList";

const SortedGroup = ({
  isSortsShowed,
  handleToggleMenu,
  handleSortByTitle,
  sortBy,
  order,
  handleSortByLimit,
  handleSortByJoinStatus,
  resetFilter,
}: GroupListProps) => {
  
  return (
    <div className="relative">
      <div className=" flex justify-end" onClick={handleToggleMenu}>
        <div className="flex items-center">
          <FilterIcon />
        </div>
      </div>
      {isSortsShowed && (
        <div className="items-center right-0 mt-1 p-1 dark:bg-tg-bg-theme  border-gray-300 shadow-md rounded flex justify-around">
          <div
            onClick={handleSortByTitle}
            className={
              sortBy === "title"
                ? "p-2 border-2 text-xs  bg-tg-bg-theme border-green-300 rounded-md flex flex-row"
                : "p-2 border-2 text-xs rounded-md bg-tg-bg-theme flex flex-row"
            }
          >
            Alphabet
            {sortBy === "title" && (
              <div className={"text-xs bg-tg-bg-theme border-green-300 pl-1"}>
                <div className="flex flex-col">
                  <ArrowTopIcon isActive={order === "asc"} />
                  <ArrowBottomIcon isActive={order === "desc"} />
                </div>
              </div>
            )}
          </div>

          <div
            onClick={handleSortByLimit}
            className={
              sortBy === "limit"
                ? "p-2 border-2 text-xs  bg-tg-bg-theme border-green-300 rounded-md flex flex-row "
                : "p-2 border-2 text-xs bg-tg-bg-theme rounded-md flex flex-row"
            }
          >
            Limit
            {sortBy === "limit" && (
              <div className={"text-xs bg-tg-bg-theme border-green-300 pl-1"}>
                <div className="flex flex-col">
                  <ArrowTopIcon isActive={order === "asc"} />
                  <ArrowBottomIcon isActive={order === "desc"} />
                </div>
              </div>
            )}
          </div>
          <div
            onClick={handleSortByJoinStatus}
            className={
              sortBy === "joinStatus"
                ? "p-2 border-2 text-xs  bg-tg-bg-theme border-green-300 rounded-md flex flex-row "
                : "p-2 border-2 text-xs bg-tg-bg-theme rounded-md flex flex-row"
            }
          >
            Join in Group
            {sortBy === "joinStatus" && (
              <div className={"text-xs bg-tg-bg-theme border-green-300 pl-1"}>
                <div className="flex flex-col">
                  <ArrowTopIcon isActive={order === "asc"} />
                  <ArrowBottomIcon isActive={order === "desc"} />
                </div>
              </div>
            )}
          </div>
          <div onClick={resetFilter}>
            <FilterResetIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default SortedGroup;
