import { PointerSensor, PointerSensorOptions } from "@dnd-kit/core";
import type { PointerEvent } from "react";

const interactiveElements = new Set([
  "button",
  "input",
  "textarea",
  "select",
  "option"
]);

const hasInteractiveParent = (event: globalThis.PointerEvent) => {
  return event
    .composedPath()
    .map((elt) => (elt as Element).tagName)
    .some((tag) => interactiveElements.has(tag?.toLocaleLowerCase()));
};

class OknoPointerSensor extends PointerSensor {
  static activators: {
    eventName: "onPointerDown";
    handler: (
      { nativeEvent: event }: PointerEvent,
      { onActivation }: PointerSensorOptions
    ) => boolean;
  }[] = [
    {
      eventName: "onPointerDown",
      handler: ({ nativeEvent: event }: PointerEvent) => {
        const isInteractive =
          !event.isPrimary || event.button !== 0 || hasInteractiveParent(event);

        return !isInteractive;
      }
    }
  ];
}

export class OknoMoveSensor extends OknoPointerSensor {}
export class OknoResizeSensor extends OknoPointerSensor {}
