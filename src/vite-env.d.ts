/// <reference types="vite/client" />

declare global {
    interface Window {
      ton?: unknown;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Telegram: any;
    }
  }
  
  declare module '../components/GroupList/dataGroupCatalog.js' {
    interface GroupCatalogItem {
      name: string;
      title: string;
      image: string;
      limit: string;
    }
  
    const value: GroupCatalogItem[];
    export default value;
  }
  