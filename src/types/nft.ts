export interface INftRoot {
  nft_items: INftItem[];
}

export interface INftItem {
  address: string;
  index: number;
  owner?: IOwner;
  collection?: ICollection;
  verified: boolean;
  metadata: IMetadata;
  previews: IPreview[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  approved_by: any[];
  trust?: string;
  title: string;
}

export interface IOwner {
  address: string;
  is_scam: boolean;
  is_wallet: boolean;
}

export interface ICollection {
  address: string;
  name: string;
  description: string;
}

export interface IMetadata {
  image?: string;
  attributes?: IAttribute[];
  description?: string;
  name?: string;
  content_url?: string;
  content_type?: string;
}

export interface IAttribute {
  trait_type: string;
  value: string;
}

export interface IPreview {
  resolution: string;
  url: string;
}
