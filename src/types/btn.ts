interface ButtonProps {
    t: (key: string) => string;
    handleOpenList: () => void;
    name: string;
    styleOverride?: React.CSSProperties;
  }
  
  export default ButtonProps;