import React, { createContext, useContext } from "react";
import { Dimensions } from "./types";

type CurrentOknoContext = {
  id: string;
  dimensions: Dimensions;
};

const currentOknoContext = createContext({} as CurrentOknoContext);

type CurrentOknoProviderProps = {
  id: string;
  dimensions: Dimensions;
};

export const CurrentOknoProvider: React.FC<CurrentOknoProviderProps> = ({
  id,
  dimensions,
  children
}) => {
  return (
    <currentOknoContext.Provider value={{ id, dimensions }}>
      {children}
    </currentOknoContext.Provider>
  );
};

export const useCurrentOkno = () => useContext(currentOknoContext);
