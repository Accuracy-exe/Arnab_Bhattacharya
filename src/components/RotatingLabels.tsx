import { useEffect, useRef, useState } from "react";

interface Props {
  labels: string[];
  interval?: number;
  className?: string;
}

export default function RotatingLabel({
  labels,
  interval = 1500,
  className = "",
}: Props) {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startRotation = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % labels.length);
    }, interval);
  };

  const stopRotation = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <span
      onMouseEnter={startRotation}
      onMouseLeave={stopRotation}
      className={`font-roboto-condensed font-bold lowercase text-xl lg:text-[1rem] lg:leading-[1rem] bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 transition-opacity duration-300 ease-in-out ${className}`}
    >
      {labels[index]}
    </span>
  );
}
