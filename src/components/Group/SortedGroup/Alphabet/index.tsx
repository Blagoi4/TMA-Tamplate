import React from "react";
import classNames from "classnames";
import ArrowBottomIcon from "../../../UI/ArrowBottom";
import ArrowTopIcon from "../../../UI/ArrowTop";
import { GroupListProps } from "../../../../types/group";

const Alphabet: React.FC<GroupListProps> = ({
  handleSortByTitle,
  sortBy,
  order,
}) => {
  const isSortedByTitle = sortBy === "title";

  return (
    <div
      onClick={handleSortByTitle}
      className={classNames(
        "p-2 border-2 text-xs bg-tg-bg-theme rounded-md inline-flex",
        {
          "border-green-300": isSortedByTitle,
        }
      )}
    >
      <div className="flex items-center">
        <span>Alphabet</span>
        <div
          className={classNames(
            "text-xs bg-tg-bg-theme border-green-300 pl-1 ml-2 flex flex-col",
            {
              visible: isSortedByTitle,
              invisible: !isSortedByTitle,
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

export default Alphabet;