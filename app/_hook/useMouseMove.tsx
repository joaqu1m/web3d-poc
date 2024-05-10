import { useGlobalEvent } from "@/app/_context/GlobalEventProvider";
import { useEffect } from "react";

export const useMouseMove = (callback: (e: MouseEvent) => void) => {
  const { mouseMove } = useGlobalEvent();
  useEffect(() => {
    mouseMove && callback(mouseMove);
  }, [mouseMove]);
};
