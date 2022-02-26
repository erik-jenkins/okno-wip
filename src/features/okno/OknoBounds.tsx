import React, {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { debounce } from "lodash";
import { OknoComponentProps } from "./types";
import { useOkno } from "./useOkno";

export const OknoBounds: React.FC<OknoComponentProps> = ({
  as,
  children,
  style = {},
  ...rest
}) => {
  const { setBoundingRect } = useOkno();
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  useLayoutEffect(() => {
    const onWindowResize = debounce(() => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }, 100);

    window.addEventListener("resize", onWindowResize);

    return () => window.removeEventListener("resize", onWindowResize);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const { x, y, width, height } = ref.current.getBoundingClientRect();
    setBoundingRect({ position: { x, y }, dimensions: { width, height } });
  }, [windowDimensions, setBoundingRect]);

  return (
    <div
      className="okno-bounds"
      style={{ height: "100%", width: "100%", ...style }}
      {...rest}
      ref={ref}
    >
      {children}
    </div>
  );
};
