import React from "react";
import { OknoComponentProps } from "./types";
import { useOkno } from "./useOkno";
import { useCurrentOkno } from "./useCurrentOkno";

export const OknoHideButton: React.FC<OknoComponentProps> = ({
  as,
  children,
  style = {},
  ...rest
}) => {
  const { hideOkno } = useOkno();
  const { id } = useCurrentOkno();

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    hideOkno(id);
  };

  const Component = as || "button";

  return (
    <Component
      className="okno-closebutton"
      onClick={onClick}
      style={{ ...style }}
      {...rest}
    >
      {children}
    </Component>
  );
};
