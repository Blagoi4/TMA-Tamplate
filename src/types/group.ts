import { GroupCatalogItem } from "../hooks/sorting/useRemoteData";
import { OrderTypes, SortTypes } from "../hooks/sorting/useSortedData";


export interface GroupListProps {
    isListShowed?: boolean;
    isSortsShowed?: boolean;
    handleToggleMenu?: () => void;
    handleSortByTitle?: () => void;
    sortBy: SortTypes;
    order: OrderTypes;
    handleSortByLimit?: () => void;
    handleSortByJoinStatus?: () => void;
    resetFilter?: () => void;
    sortedData?: GroupCatalogItem[];
  }