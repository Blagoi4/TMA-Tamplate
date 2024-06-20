import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSortedData } from "../../hooks/sorting/useSortedData";
import { useGroupData } from "../../hooks/sorting/useGroupData";
import Button from "../Button";
import GroupList from "./GroupList";

const Group: React.FC = () => {
  const [isListShowed, setIsListShowed] = useState(false);
  const [isSortsShowed, setIsSortsShowed] = useState(false);

  const data = useGroupData();
  const { toggleSortBy, order, setOrder, sortBy, setSortBy, sortedData } =
    useSortedData(data);

  const { t } = useTranslation();

  const handleOpenList = () => {
    setIsListShowed((prevState) => !prevState);
  };

  const handleToggleMenu = () => {
    setIsSortsShowed((prevState) => !prevState);
  };

  const handleSortByTitle = () => {
    toggleSortBy("title");
  };

  const handleSortByLimit = () => {
    toggleSortBy("limit");
  };

  const handleSortByJoinStatus = () => {
    toggleSortBy("joinStatus");
  };

  const resetFilter = () => {
    setSortBy("default");
    setOrder("asc");
  };

  return (
    <div className="overflow-hidden text-tg-text flex flex-col gap-2.5">
      <Button
        t={t}
        handleOpenList={handleOpenList}
        name={"Open List Chat"}
        styleOverride={{
          backgroundColor: "var(--tg-theme-button-color)",
          color: "var(--tg-theme-button-text-color)",
        }}
      />
      <GroupList
        isListShowed={isListShowed}
        isSortsShowed={isSortsShowed}
        handleToggleMenu={handleToggleMenu}
        handleSortByTitle={handleSortByTitle}
        sortBy={sortBy}
        order={order}
        handleSortByLimit={handleSortByLimit}
        handleSortByJoinStatus={handleSortByJoinStatus}
        resetFilter={resetFilter}
        sortedData={sortedData}
      />
    </div>
  );
};

export default Group;
