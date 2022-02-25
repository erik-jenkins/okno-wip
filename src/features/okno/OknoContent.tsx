import { OknoComponentProps } from "./types";
import { useCurrentOkno } from "./useCurrentOkno";

export const OknoContent: React.FC<OknoComponentProps> = ({
  as,
  children,
  style = {},
  ...rest
}) => {
  const { dimensions } = useCurrentOkno();
  const Component = as || "div";

  return (
    <Component
      className="okno-content"
      style={{
        height: `${dimensions.height}px`,
        overflowY: "auto",
        ...style
      }}
      {...rest}
    >
      {children}
    </Component>
  );
};
