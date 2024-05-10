import { useGlobalEvent } from "@/app/_context/GlobalEventProvider";
import { useEffect } from "react";

export const useMouseUp = (callback: (e: MouseEvent) => void) => {
  const { mouseUp } = useGlobalEvent();
  useEffect(() => {
    mouseUp && callback(mouseUp);
  }, [mouseUp]);
};
