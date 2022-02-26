import React, { MutableRefObject, useRef, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  useSensor
} from "@dnd-kit/core";
import {
  getEventDetails,
  Okno,
  OknoComponentProps,
  OknoEventType,
  Position,
  Rectangle
} from "./types";
import { OknoMoveSensor } from "./OknoPointerSensor";
import { CurrentOknoProvider } from "./useCurrentOkno";
import { useOkno } from "./useOkno";

const getBoundedOknoPosition = (
  oknoRect: Rectangle,
  boundingRect: Rectangle
): Position => {
  let boundedX = Math.max(boundingRect.position.x, oknoRect.position.x);
  if (boundedX + oknoRect.dimensions.width > boundingRect.dimensions.width)
    boundedX =
      boundingRect.position.x +
      boundingRect.dimensions.width -
      oknoRect.dimensions.width;

  let boundedY = Math.max(boundingRect.position.y, oknoRect.position.y);
  if (boundedY + oknoRect.dimensions.height > boundingRect.dimensions.height)
    boundedY =
      boundingRect.position.y +
      boundingRect.dimensions.height -
      oknoRect.dimensions.height;

  return {
    x: boundedX,
    y: boundedY
  };
};

type OknoWrapperProps = OknoComponentProps & {
  okno: Okno;
};

export const OknoWrapper: React.FC<OknoWrapperProps> = ({
  okno,
  as,
  style = {},
  children,
  ...rest
}) => {
  const {
    saveOknoPosition,
    saveOknoDimensions,
    focusOkno,
    boundingRect
  } = useOkno();
  const [tempPosition, setTempPosition] = useState(okno.position);
  const [tempDimensions, setTempDimensions] = useState(okno.dimensions);
  const moveSensor = useSensor(OknoMoveSensor);
  const oknoRef = useRef() as MutableRefObject<HTMLDivElement>;

  const onDragMove = (e: DragMoveEvent) => {
    const { eventType, deltaX, deltaY } = getEventDetails(e);

    switch (eventType) {
      case OknoEventType.Move:
        const {
          width: refWidth,
          height: refHeight
        } = oknoRef.current.getBoundingClientRect();
        const boundedOknoPosition = getBoundedOknoPosition(
          {
            position: {
              x: okno.position.x + deltaX,
              y: okno.position.y + deltaY
            },
            dimensions: {
              width: refWidth,
              height: refHeight
            }
          },
          boundingRect
        );

        setTempPosition(boundedOknoPosition);
        break;
      case OknoEventType.Resize:
        setTempDimensions({
          width: okno.dimensions.width + deltaX,
          height: okno.dimensions.height + deltaY
        });
        break;
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { eventType } = getEventDetails(e);

    switch (eventType) {
      case OknoEventType.Move:
        saveOknoPosition(okno.id, tempPosition);
        break;
      case OknoEventType.Resize:
        saveOknoDimensions(okno.id, tempDimensions);
        break;
    }
  };

  const onClick = () => {
    focusOkno(okno.id);
  };

  const Component = as || "div";

  return (
    <CurrentOknoProvider id={okno.id} dimensions={tempDimensions}>
      <DndContext
        sensors={[moveSensor]}
        onDragStart={onClick}
        onDragMove={onDragMove}
        onDragEnd={onDragEnd}
      >
        <Component
          onClick={onClick}
          style={{
            position: "absolute",
            transform: `translate3d(${tempPosition.x}px, ${tempPosition.y}px, 0)`,
            zIndex: okno.zIndex,
            width: `${tempDimensions.width}px`,
            ...style
          }}
          {...rest}
        >
          <div style={{ height: "100%", width: "100" }} ref={oknoRef}>
            {children}
          </div>
        </Component>
      </DndContext>
    </CurrentOknoProvider>
  );
};
