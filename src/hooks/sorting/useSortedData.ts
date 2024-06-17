import { useMemo, useState } from "react";
import type { GroupCatalogItem } from "./useRemoteData";

export type SortTypes = "title" | "limit" | "default" | "joinStatus";
export type OrderTypes = "asc" | "desc";

const sortInsideGroup = (
  data: GroupCatalogItem[],
  sortFn: (a: GroupCatalogItem, b: GroupCatalogItem) => number
) => {
  const favorites = data.filter((el) => el.favorite);
  const unfavorites = data.filter((el) => !el.favorite);

  return [...favorites.sort(sortFn), ...unfavorites.sort(sortFn)];
};

const getDefaultData = () => () => 0;

const sortByName = (order: OrderTypes) => {
  return order === "asc"
    ? (a: GroupCatalogItem, b: GroupCatalogItem) => a.name.localeCompare(b.name)
    : (a: GroupCatalogItem, b: GroupCatalogItem) =>
        b.name.localeCompare(a.name);
};

const sortByLimits = (order: OrderTypes) => {
  return order === "asc"
    ? (a: GroupCatalogItem, b: GroupCatalogItem) =>
        a.limit.localeCompare(b.limit)
    : (a: GroupCatalogItem, b: GroupCatalogItem) =>
        b.limit.localeCompare(a.limit);
};
const sortByJoinStatus = (order: OrderTypes) => {
  return order === "asc"
    ? (a: GroupCatalogItem, b: GroupCatalogItem) =>
        a.join === b.join ? 0 : a.join ? -1 : 1
    : (a: GroupCatalogItem, b: GroupCatalogItem) =>
        a.join === b.join ? 0 : a.join ? 1 : -1;
};
const sortFunctions = {
  default: getDefaultData,
  title: sortByName,
  limit: sortByLimits,
  joinStatus: sortByJoinStatus,
};

export function useSortedData(data: GroupCatalogItem[]) {
  const [order, setOrder] = useState<OrderTypes>("asc");
  const [sortBy, setSortBy] = useState<SortTypes>("default");

  const sortedData = useMemo(() => {
    const sortFn = sortFunctions[sortBy](order);
    return sortInsideGroup([...data], sortFn);
  }, [data, order, sortBy]);

  const toggleSortBy = (sortType: SortTypes) => {
    if (sortType === sortBy) {
      if (order === "asc") {
        setOrder("desc");
      } else if (order === "desc") {
        setSortBy("default");
        setOrder("asc");
      }
    } else {
      setSortBy(sortType);
      setOrder("asc");
    }
  };

  return {
    toggleSortBy,
    sortedData,
    order,
    setOrder,
    sortBy,
    setSortBy,
  };
}
