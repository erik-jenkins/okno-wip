import { useDraggable } from "@dnd-kit/core";
import { OknoComponentProps } from "./types";
import { useCurrentOkno } from "./useCurrentOkno";

export const OknoTitlebar: React.FC<OknoComponentProps> = ({
  as,
  children,
  ...rest
}) => {
  const { id } = useCurrentOkno();
  const { attributes, listeners } = useDraggable({
    id: `okno.move.${id}`
  });

  const Component = as || "div";
  return (
    <Component
      className="okno-titlebar"
      {...listeners}
      {...attributes}
      {...rest}
    >
      {children}
    </Component>
  );
};
