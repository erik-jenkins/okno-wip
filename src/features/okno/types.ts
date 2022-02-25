import { DragEndEvent, DragMoveEvent } from "@dnd-kit/core";

export type Position = {
  x: number;
  y: number;
};

export type Dimensions = {
  width: number;
  height: number;
};

export type Okno = {
  id: string;
  title: string;
  position: Position;
  dimensions: Dimensions;
  zIndex: number;
};

export type OknoComponentProps = {
  as?: React.ComponentType;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  [prop: string]: any;
};

export enum OknoEventType {
  Move = "MOVE",
  Resize = "RESIZE"
}

const getEventType = (eventId: string) =>
  eventId.includes("okno.move") ? OknoEventType.Move : OknoEventType.Resize;

const getRawId = (id: string) => id.replace(/okno\..+\./, "");

export const getEventDetails = (event: DragMoveEvent | DragEndEvent) => {
  const eventType = getEventType(event.active.id);
  const id = getRawId(event.active.id);
  const { x: deltaX, y: deltaY } = event.delta;
  return { id, eventType, deltaX, deltaY };
};
