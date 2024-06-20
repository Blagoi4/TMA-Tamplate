import React from "react";
import ButtonProps from "../../types/btn";

const Button: React.FC<ButtonProps> = ({
  t,
  handleOpenList,
  name,
  styleOverride,
}) => {
  return (
    <button
      onClick={handleOpenList}
      className="py-4 px-16 rounded-2xl text-lg min-w-[350px] border border-gray-300 cursor-pointer whitespace-nowrap"
      style={styleOverride}
    >
      {t(name)}
    </button>
  );
};

export default Button;
