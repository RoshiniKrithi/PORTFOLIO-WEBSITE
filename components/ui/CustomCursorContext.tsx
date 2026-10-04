"use client";

import React, { createContext, useContext, useState } from "react";

export type CursorVariant = "default" | "view" | "link" | "copy" | "copied" | "close" | "expand";

interface CursorContextType {
  cursorVariant: CursorVariant;
  cursorText: string;
  setCursor: (variant: CursorVariant, text?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorVariant: "default",
  cursorText: "",
  setCursor: () => {},
  resetCursor: () => {},
});

export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>("default");
  const [cursorText, setCursorText] = useState<string>("");

  const setCursor = (variant: CursorVariant, text: string = "") => {
    setCursorVariant(variant);
    setCursorText(text);
  };

  const resetCursor = () => {
    setCursorVariant("default");
    setCursorText("");
  };

  return (
    <CursorContext.Provider value={{ cursorVariant, cursorText, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
