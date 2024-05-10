"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface GlobalEventContextType {
  mouseMove: MouseEvent | null;
  mouseUp: MouseEvent | null;
}

const GlobalEventContext = createContext<GlobalEventContextType | undefined>(
  undefined
);

export const GlobalEventProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mouseMove, setMouseMove] = useState<MouseEvent | null>(null);
  const [mouseUp, setMouseUp] = useState<MouseEvent | null>(null);

  useEffect(() => {
    document.addEventListener("mousemove", setMouseMove);
    document.addEventListener("mouseup", setMouseUp);
    return () => {
      document.removeEventListener("mousemove", setMouseMove);
      document.removeEventListener("mouseup", setMouseUp);
    };
  }, []);

  return (
    <GlobalEventContext.Provider
      value={{
        mouseMove,
        mouseUp,
      }}
    >
      {children}
    </GlobalEventContext.Provider>
  );
};

export const useGlobalEvent = () => {
  const context = useContext(GlobalEventContext);

  if (context === undefined) {
    throw new Error("useGlobalEvent must be used within a GlobalEventProvider");
  }

  return context;
};
