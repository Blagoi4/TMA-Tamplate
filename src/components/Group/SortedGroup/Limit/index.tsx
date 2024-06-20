import React from "react";
import classNames from "classnames";
import ArrowBottomIcon from "../../../UI/ArrowBottom";
import ArrowTopIcon from "../../../UI/ArrowTop";
import { GroupListProps } from "../../../../types/group";

const Limit: React.FC<GroupListProps> = ({
  handleSortByLimit,
  sortBy,
  order,
}) => {
  const isSortedByLimit = sortBy === "limit";

  return (
    <div
      onClick={handleSortByLimit}
      className={classNames(
        "p-2 border-2 text-xs bg-tg-bg-theme rounded-md flex flex-row",
        {
          "border-green-300": isSortedByLimit,
        }
      )}
    >
      <div className="flex items-center">
        <span>Limit</span>
        <div
          className={classNames(
            "text-xs bg-tg-bg-theme border-green-300 pl-1 ml-2 flex flex-col",
            {
              visible: isSortedByLimit,
              invisible: !isSortedByLimit,
            }
          )}
        >
          <ArrowTopIcon isActive={order === "asc"} />
          <ArrowBottomIcon isActive={order === "desc"} />
        </div>
      </div>
    </div>
  );
};

export default Limit;
