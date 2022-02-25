import React, { createContext, useContext, useState } from "react";
import { Map } from "immutable";
import { v4 as uuid } from "uuid";
import { Dimensions, Okno, Position } from "./types";

type OknoContext = {
  oknos: Okno[];
  createOkno: (title: string) => void;
  saveOknoPosition: (id: string, newPosition: Position) => void;
  saveOknoDimensions: (id: string, newDimensions: Dimensions) => void;
  focusOkno: (id: string) => void;
  closeOkno: (id: string) => void;
};

const oknoContext = createContext({} as OknoContext);

export const OknoProvider: React.FC = ({ children }) => {
  const [oknoMap, setOknoMap] = useState(Map<string, Okno>());
  const [maxZIndex, setMaxZIndex] = useState(1);

  const createOkno = (title: string) => {
    const id = uuid();
    const newOknoMap = oknoMap.set(id, {
      id,
      title,
      position: { x: 100, y: 100 },
      dimensions: { width: 600, height: 400 },
      zIndex: 0
    });
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

  const focusOkno = (id: string) => {
    if (!oknoMap.has(id)) return;
    if (oknoMap.get(id)?.zIndex === maxZIndex) return;

    const newZIndex = maxZIndex + 1;
    setOknoMap(oknoMap.setIn([id, "zIndex"], newZIndex));
    setMaxZIndex((old) => old + 1);

    // TODO: if zIndex hits a certain threshold, reset all zIndices
  };

  const closeOkno = (id: string) => {
    setOknoMap(oknoMap.delete(id));
  };

  return (
    <oknoContext.Provider
      value={{
        oknos: Array.from(oknoMap.values()),
        createOkno,
        saveOknoPosition,
        saveOknoDimensions,
        focusOkno,
        closeOkno
      }}
    >
      {children}
    </oknoContext.Provider>
  );
};

export const useOkno = () => useContext(oknoContext);
