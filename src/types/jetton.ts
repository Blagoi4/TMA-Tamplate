interface Jetton {
  imageError: boolean;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  image: string;
}

interface JettonData {
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
    getJetton: JettonData[];
    open: boolean;
  }

  export type { Jetton, JettonData, ImageWithFallbackProps, JettonListProps, WalletAddress };