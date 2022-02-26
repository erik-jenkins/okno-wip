import React, { createContext, useContext, useState } from "react";
import { Map } from "immutable";
import { v4 as uuid } from "uuid";
import { Dimensions, Okno, Position } from "./types";

type OknoContext = {
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
    setOknoMap(newOknoMap.sort((a, b) => a.zIndex - b.zIndex));
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
    setOknoMap(
      oknoMap.setIn([id, "isHidden"], true).sort((a, b) => a.zIndex - b.zIndex)
    );
  };

  const showOkno = (id: string) => {
    if (!oknoMap.has(id)) return;
    const newOkno = oknoMap
      .setIn([id, "isHidden"], false)
      .setIn([id, "zIndex"], maxZIndex + 1);
    setOknoMap(newOkno);
    setMaxZIndex((old) => old + 1);
  };

  const closeOkno = (id: string) => {
    if (!oknoMap.has(id)) return;
    setOknoMap(oknoMap.delete(id));
  };

  const focusOkno = (id: string) => {
    if (!oknoMap.has(id)) return;
    if (oknoMap.get(id)?.zIndex === maxZIndex) return;

    const newOknoMap = oknoMap.setIn([id, "zIndex"], maxZIndex + 1);
    setOknoMap(newOknoMap);
    setMaxZIndex((old) => old + 1);

    // TODO: if zIndex hits a certain threshold, reset all zIndices
  };

  return (
    <oknoContext.Provider
      value={{
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
