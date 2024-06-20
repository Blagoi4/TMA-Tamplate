import React from "react";
import classNames from "classnames";
import ArrowBottomIcon from "../../../UI/ArrowBottom";
import ArrowTopIcon from "../../../UI/ArrowTop";
import { GroupListProps } from "../../../../types/group";

const JoinStatus: React.FC<GroupListProps> = ({
  handleSortByJoinStatus,
  sortBy,
  order,
}) => {
  const isSortedByJoinStatus = sortBy === "joinStatus";

  return (
    <div
      onClick={handleSortByJoinStatus}
      className={classNames(
        "p-2 border-2 text-xs bg-tg-bg-theme rounded-md flex flex-row",
        {
          "border-green-300": isSortedByJoinStatus,
        }
      )}
    >
      <div className="flex items-center ">
        <span>Join in Group</span>
        <div
          className={classNames(
            "text-xs bg-tg-bg-theme border-green-300 pl-1 flex flex-col",
            {
              visible: isSortedByJoinStatus,
              invisible: !isSortedByJoinStatus,
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

export default JoinStatus;
