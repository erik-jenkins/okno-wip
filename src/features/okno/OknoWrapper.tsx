import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  useSensor
} from "@dnd-kit/core";
import {
  restrictToHorizontalAxis,
  restrictToParentElement,
  restrictToWindowEdges
} from "@dnd-kit/modifiers";
import {
  getEventDetails,
  Okno,
  OknoComponentProps,
  OknoEventType
} from "./types";
import { OknoMoveSensor } from "./OknoPointerSensor";
import { CurrentOknoProvider } from "./useCurrentOkno";
import { useOkno } from "./useOkno";

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
  const { saveOknoPosition, saveOknoDimensions, focusOkno } = useOkno();
  const [tempPosition, setTempPosition] = useState(okno.position);
  const [tempDimensions, setTempDimensions] = useState(okno.dimensions);
  const moveSensor = useSensor(OknoMoveSensor);

  const onDragMove = (e: DragMoveEvent) => {
    const { eventType, deltaX, deltaY } = getEventDetails(e);

    switch (eventType) {
      case OknoEventType.Move:
        setTempPosition({
          x: okno.position.x + deltaX,
          y: Math.max(okno.position.y + deltaY, 0)
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

  const onClick = () => {
    focusOkno(okno.id);
  };

  const Component = as || "div";

  return (
    <CurrentOknoProvider id={okno.id} dimensions={tempDimensions}>
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
        <DndContext
          sensors={[moveSensor]}
          onDragStart={onClick}
          onDragMove={onDragMove}
          onDragEnd={onDragEnd}
          // modifiers={[restrictToWindowEdges]}
        >
          {children}
        </DndContext>
      </Component>
    </CurrentOknoProvider>
  );
};
