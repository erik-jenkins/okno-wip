import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { useCurrentOkno } from "./useCurrentOkno";
import { OknoComponentProps } from "./types";

export const OknoResizeHandle: React.FC<OknoComponentProps> = ({
  as,
  children,
  style = {},
  ...rest
}) => {
  const { id } = useCurrentOkno();
  const { attributes, listeners } = useDraggable({ id: `okno.resize.${id}` });

  const Component = as || "div";
  return (
    <Component
      className="okno-resizehandle"
      style={style}
      {...listeners}
      {...attributes}
      {...rest}
    >
      {children}
    </Component>
  );
};
