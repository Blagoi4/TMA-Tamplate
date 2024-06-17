import { useMemo } from "react";
import { useRemoteData } from "./useRemoteData";

export function useGroupData() {
  const data = useRemoteData();

  const groupedData = useMemo(() => {
    const favoriteGroup = data.filter((el) => el.favorite);
    const unfavoriteGroup = data.filter((el) => !el.favorite);
    
    return favoriteGroup.concat(unfavoriteGroup);
  }, [data]);

  return groupedData;
}
