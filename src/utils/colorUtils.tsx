// import React from "react";
export const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};
export const generateBackgroundColor = (imageError: boolean, width: number, height: number): JSX.Element | null => {
    if (imageError) {
      const backgroundColor = generateRandomColor();
      return (
        <div
          style={{
            borderRadius: 16,
            width: width,
            height: height,
            backgroundColor: backgroundColor,
          }}
        ></div>
      );
    } else {
      return null;
    }
  };
