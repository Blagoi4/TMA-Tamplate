import { useEffect, useState } from "react";
import dataGroupCatalog from "../../components/Group/dataGroupCatalog";

export interface GroupCatalogItem {
  image: string;
  name: string;
  title: string;
  limit: string;
  favorite?: boolean;
  id: number;
  join: boolean;
}

async function getData(): Promise<GroupCatalogItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dataGroupCatalog);
    }, 2000);
  });
}

export function useRemoteData() {
  const [data, setData] = useState<GroupCatalogItem[]>([]);

  useEffect(() => {
    getData().then((data) => {
      setData(data);
    });
  }, []);

  return data;
}
