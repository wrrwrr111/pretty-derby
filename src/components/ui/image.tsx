// components/ui/image.tsx
import { useState } from "react";
import { CDN_SERVER, SEED_BLUE_LABELS, SEED_RED_LABELS, IMAGE_FALLBACK } from "@/config";

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

  return (
    <img
      src={imgSrc ? CDN_SERVER + imgSrc : fallback}
      alt={alt}
      width={width}
      height={height}
      onError={() => setImgSrc("")}
      {...props}
    />
  );
};
