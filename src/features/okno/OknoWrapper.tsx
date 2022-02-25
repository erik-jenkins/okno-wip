import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  useSensor
} from "@dnd-kit/core";
import { getEventDetails, OknoComponentProps, OknoEventType } from "./types";
import { OknoMoveSensor } from "./OknoPointerSensor";
import { CurrentOknoProvider } from "./useCurrentOkno";
import { useOkno } from "./useOkno";

export const OknoWrapper: React.FC<OknoComponentProps> = ({
  okno,
  as,
  style = {},
  children,
  ...rest
}) => {
  const { saveOknoPosition, saveOknoDimensions } = useOkno();
  const [tempPosition, setTempPosition] = useState(okno.position);
  const [tempDimensions, setTempDimensions] = useState(okno.dimensions);
  const moveSensor = useSensor(OknoMoveSensor);

  const onDragMove = (e: DragMoveEvent) => {
    const { eventType, deltaX, deltaY } = getEventDetails(e);

    switch (eventType) {
      case OknoEventType.Move:
        setTempPosition({
          x: okno.position.x + deltaX,
          y: okno.position.y + deltaY
        });
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

  const Component = as || "div";

  return (
    <CurrentOknoProvider id={okno.id} dimensions={tempDimensions}>
      <DndContext
        sensors={[moveSensor]}
        onDragMove={onDragMove}
        onDragEnd={onDragEnd}
      >
        <Component
          style={{
            position: "absolute",
            transform: `translate3d(${tempPosition.x}px, ${tempPosition.y}px, 0)`,
            width: `${tempDimensions.width}px`,
            ...style
          }}
          {...rest}
        >
          {children}
        </Component>
      </DndContext>
    </CurrentOknoProvider>
  );
};
