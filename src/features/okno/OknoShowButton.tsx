import React from "react";
import { OknoComponentProps } from "./types";
import { useOkno } from "./useOkno";

type OknoShowButtonProps = OknoComponentProps & {
  id: string;
};

export const OknoShowButton: React.FC<OknoShowButtonProps> = ({
  id,
  as,
  children,
  style = {},
  ...rest
}) => {
  const { showOkno } = useOkno();

  const onClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    showOkno(id);
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
