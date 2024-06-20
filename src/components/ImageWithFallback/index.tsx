import React, { useState } from "react";
import { generateRandomColor } from "../../utils/colorUtils";

interface ImageWithFallbackProps {
  src: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
  imageError: boolean; 
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  width,
  height,
  style,
  imageError,
}) => {
  const [hasError, setHasError] = useState(imageError);

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
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
  }

  return (
    <img
      src={src}
      width={width}
      height={height}
      style={style}
      onError={handleError}
      alt="Product"
    />
  );
};

export default ImageWithFallback;