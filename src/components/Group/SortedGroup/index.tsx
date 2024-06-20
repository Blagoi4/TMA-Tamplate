import FilterIcon from "../../UI/FilterIcon/index";
import FilterResetIcon from "../../UI/FilterResetIcon/index";
import Alphabet from "./Alphabet";
import Limit from "./Limit";
import JoinStatus from "./JoinStatus";
import { GroupListProps } from "../../../types/group";

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
        <div className="items-center  mt-1 p-1 dark:bg-tg-bg-theme  border-gray-300 shadow-md rounded flex justify-around ">
          <Alphabet
            handleSortByTitle={handleSortByTitle}
            sortBy={sortBy}
            order={order}
          />
          <Limit
            handleSortByLimit={handleSortByLimit}
            sortBy={sortBy}
            order={order}
          />
          <JoinStatus
            handleSortByJoinStatus={handleSortByJoinStatus}
            sortBy={sortBy}
            order={order}
          />
          <div onClick={resetFilter}>
            <FilterResetIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default SortedGroup;
