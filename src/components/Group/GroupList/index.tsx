import SortedGroup from "../SortedGroup";
import { GroupListProps } from "../../../types/group";

const GroupList = ({
  isListShowed,
  isSortsShowed,
  handleToggleMenu,
  handleSortByTitle,
  sortBy,
  order,
  handleSortByLimit,
  handleSortByJoinStatus,
  resetFilter: resetFilter,
  sortedData,
}: GroupListProps) => {
  return (
    <ul
      style={{ paddingRight: 5 }}
      className={`${
        isListShowed ? "max-h-96 overflow-y-auto" : "max-h-0"
      } transition-all duration-700  ease-in-out min-w-[350px] flex flex-col gap-4`}
    >
      <SortedGroup
        isSortsShowed={isSortsShowed}
        handleToggleMenu={handleToggleMenu}
        handleSortByTitle={handleSortByTitle}
        handleSortByLimit={handleSortByLimit}
        handleSortByJoinStatus={handleSortByJoinStatus}
        sortBy={sortBy}
        order={order}
        resetFilter={resetFilter}
      />
      {sortedData &&
        sortedData.map((item) => (
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
  );
};

export default GroupList;
