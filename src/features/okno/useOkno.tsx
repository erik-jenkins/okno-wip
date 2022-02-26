import React, { createContext, useContext, useState } from "react";
import { Map } from "immutable";
import { v4 as uuid } from "uuid";
import { Dimensions, Okno, Position } from "./types";

type OknoContext = {
  oknos: Okno[];
  getVisibleOknos: () => Okno[];
  getHiddenOknos: () => Okno[];
  createOkno: (title: string) => void;
  saveOknoPosition: (id: string, newPosition: Position) => void;
  saveOknoDimensions: (id: string, newDimensions: Dimensions) => void;
  hideOkno: (id: string) => void;
  showOkno: (id: string) => void;
  focusOkno: (id: string) => void;
  closeOkno: (id: string) => void;
};

const oknoContext = createContext({} as OknoContext);

export const OknoProvider: React.FC = ({ children }) => {
  const [oknoMap, setOknoMap] = useState(Map<string, Okno>());
  const [maxZIndex, setMaxZIndex] = useState(1);

  const getVisibleOknos = () => {
    return Array.from(oknoMap.filter((okno) => !okno.isHidden).values());
  };

  const getHiddenOknos = () => {
    return Array.from(oknoMap.filter((okno) => okno.isHidden).values());
  };

  const createOkno = (title: string) => {
    const id = uuid();
    const newOknoMap = oknoMap.set(id, {
      id,
      title,
      position: { x: 100, y: 100 },
      dimensions: { width: 600, height: 400 },
      zIndex: maxZIndex + 1,
      isHidden: false
    });
    setMaxZIndex((old) => old + 1);
    setOknoMap(newOknoMap);
  };

  const saveOknoPosition = (id: string, newPosition: Position) => {
    if (!oknoMap.has(id)) return;
    setOknoMap(oknoMap.setIn([id, "position"], newPosition));
  };

  const saveOknoDimensions = (id: string, newDimensions: Dimensions) => {
    if (!oknoMap.has(id)) return;
    setOknoMap(oknoMap.setIn([id, "dimensions"], newDimensions));
  };

  const hideOkno = (id: string) => {
    if (!oknoMap.has(id)) return;
    setOknoMap(oknoMap.setIn([id, "isHidden"], true));
  };

  const showOkno = (id: string) => {
    console.log(id);
    if (!oknoMap.has(id)) return;
    setOknoMap(oknoMap.setIn([id, "isHidden"], false));
  };

  const closeOkno = (id: string) => {
    if (!oknoMap.has(id)) return;
    setOknoMap(oknoMap.delete(id));
  };

  const focusOkno = (id: string) => {
    if (!oknoMap.has(id)) return;
    if (oknoMap.get(id)?.zIndex === maxZIndex) return;

    const newZIndex = maxZIndex + 1;
    setOknoMap(oknoMap.setIn([id, "zIndex"], newZIndex));
    setMaxZIndex((old) => old + 1);

    // TODO: if zIndex hits a certain threshold, reset all zIndices
  };

  return (
    <oknoContext.Provider
      value={{
        oknos: Array.from(oknoMap.values()),
        getVisibleOknos,
        getHiddenOknos,
        createOkno,
        saveOknoPosition,
        saveOknoDimensions,
        hideOkno,
        showOkno,
        focusOkno,
        closeOkno
      }}
    >
      {children}
    </oknoContext.Provider>
  );
};

export const useOkno = () => useContext(oknoContext);
