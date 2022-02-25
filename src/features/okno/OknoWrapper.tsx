import React, { useState } from "react";
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
        >
          {children}
        </DndContext>
      </Component>
    </CurrentOknoProvider>
  );
};
