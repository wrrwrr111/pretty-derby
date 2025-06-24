// components/ui/image.tsx
import { useEffect, useState } from "react";
import { IMAGE_FALLBACK } from "@/config";

interface ImageProps {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  fallback?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Image = ({
  src,
  alt = "",
  width,
  height,
  fallback = IMAGE_FALLBACK,
  ...props
}: ImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      src={imgSrc ? imgSrc : fallback}
      alt={alt}
      width={width}
      height={height}
      onError={() => setImgSrc("")}
      {...props}
    />
  );
};
