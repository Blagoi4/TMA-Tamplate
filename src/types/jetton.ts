interface Jetton {
  imageError: boolean;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  image: string;
}

interface JettonDataType {
  balance: string;
  wallet_address: WalletAddress;
  jetton: Jetton;
}

interface WalletAddress {
  address: string;
  is_scam: boolean;
  is_wallet: boolean;
}
interface ImageWithFallbackProps {
  src: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
}

interface JettonListProps {
  loading: boolean;
  getJetton: JettonDataType[];
  open: boolean;
}

export type {
  Jetton,
  JettonDataType,
  ImageWithFallbackProps,
  JettonListProps,
  WalletAddress,
};
